import {BsSearch} from 'react-icons/bs'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import JobItem from '../JobItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    userProfile: {},
    jobsData: [],
    apiStatusUP: apiStatusConstants.initial,
    apiStatusJobs: apiStatusConstants.initial,
    searchInput: '',
  }

  componentDidMount() {
    this.getJobs()
    this.getUserProfile()
  }

  getJobs = async () => {
    this.setState({apiStatusJobs: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/jobs'
    const token = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const updatedData = data.jobs.map(each => ({
      companyLogoUrl: each.company_logo_url,
      employmentType: each.employment_type,
      id: each.id,
      jobDescription: each.job_description,
      location: each.location,
      packagePerAnnum: each.package_per_annum,
      rating: each.rating,
      title: each.title,
    }))
    if (response.ok === true) {
      this.setState({
        jobsData: updatedData,
        apiStatusJobs: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatusJobs: apiStatusConstants.failure})
    }
  }

  getUserProfile = async () => {
    this.setState({apiStatusJobs: apiStatusConstants.inProgress})
    const profileUrl = 'https://apis.ccbp.in/profile'
    const token = Cookies.get('jwt_token')
    const profileOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const userProfileResp = await fetch(profileUrl, profileOptions)
    const userProfileData = await userProfileResp.json()
    const updatedUP = {
      name: userProfileData.profile_details.name,
      shortBio: userProfileData.profile_details.short_bio,
      profileImageUrl: userProfileData.profile_details.profile_image_url,
    }
    if (userProfileResp.ok === true) {
      this.setState({
        userProfile: updatedUP,
        showLoader: false,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (userProfileResp.status === 401) {
      this.state({apiStatus: apiStatusConstants.failure})
    }
  }

  retryBtn = () => {
    this.getUserProfile()
  }

  renderBtn = () => (
    <button onClick={this.retryBtn} className="btnn">
      Retry
    </button>
  )

  successUserProfile = () => {
    const {userProfile} = this.state
    const {name, profileImageUrl, shortBio} = userProfile
    return (
      <div className="user-card">
        <img src={profileImageUrl} alt="user profile" />
        <h1>{name}</h1>
        <p>{shortBio}</p>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderUserProfile = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.successUserProfile()
      case apiStatusConstants.failure:
        return this.renderBtn()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  getSearchInput = event => {
    const {searchInput} = this.state
    this.setState({searchInput: event.target.value})
  }

  renderjobsNotFound = () => <h1 className="txt">Job Not Found</h1>

  searchJobBtn = () => {
    const {jobsData, searchInput} = this.state
    const filteredJobs = jobsData.filter(eachJob =>
      eachJob.title.toLowerCase().includes(searchInput.toLowerCase()),
    )
    if (filteredJobs.length === 0) {
      this.renderjobsNotFound()
    }

    this.setState({jobsData: filteredJobs})
  }

  renderSearch = () => {
    const {searchInput} = this.state
    return (
      <>
        <input
          type="search"
          value={searchInput}
          onChange={this.getSearchInput}
          className="searchInput"
        />
        <button
          type="button"
          data-testid="searchButton"
          onClick={this.searchJobBtn}
        >
          <BsSearch className="search-icon iconn" />
        </button>
      </>
    )
  }

  successJobs = () => {
    const {jobsData} = this.state
    return (
      <ul className="lis">
        {jobsData.map(each => (
          <JobItem data={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderJobs = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.successJobs()
      case apiStatusConstants.failure:
        return this.renderjobsNotFound()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    const {apiStatus} = this.state
    return (
      <div className="contt">
        {this.renderUserProfile()}
        <div>
          {this.renderSearch()}
          {this.renderJobs()}
        </div>
      </div>
    )
  }
}

export default Jobs
