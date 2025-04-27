import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaStar, FaExternalLinkAlt} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import {response} from 'msw'
import SimilarJobDetails from '../SimilarJobDetails'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobDetails extends Component {
  state = {jd: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getJobDetails()
  }

  getFormattedSimilarJobData = job => ({
    companyLogoUrl: job.company_logo_url,
    employmentType: job.employment_type,
    id: job.id,
    jobDescription: job.job_description,
    location: job.location,
    rating: job.rating,
    title: job.title,
  })

  getJobDetails = async () => {
    this.setState({apiStatus: 'inProgress'})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const token = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const jdResponse = await fetch(url, options)
    const jdData = await jdResponse.json()
    console.log(jdData)
    if (jdResponse.ok) {
      const updatedJD = {
        companyLogoUrl: jdData.job_details.company_logo_url,
        companyWebsiteUrl: jdData.job_details.company_website_url,
        employmentType: jdData.job_details.employment_type,
        id: jdData.job_details.id,
        jobDescription: jdData.job_details.job_description,
        description: jdData.job_details.life_at_company.description,
        imageUrl: jdData.job_details.life_at_company.image_url,
        packagePerAnnum: jdData.job_details.package_per_annum,
        location: jdData.job_details.location,
        rating: jdData.job_details.rating,
        title: jdData.job_details.title,
        skills: jdData.job_details.skills,
        similarJobs: jdData.job_details.similar_jobs.map(each =>
          this.getFormattedSimilarJobData(each),
        ),
      }
      this.setState({jd: updatedJD, apiStatus: apiStatusConstants.success})
    }
    console.log(jdData.job_details.skills)
  }

  renderJD = () => {
    const {jd} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      id,
      employmentType,
      jobDescription,
      description,
      imageUrl,
      packagePerAnnum,
      location,
      rating,
      title,
      skills,
      similarJobs,
    } = jd
    return (
      <div className="job-desc">
        <div className="job-card">
          <div className="side">
            <img src={companyLogoUrl} className="logo" />
            <div>
              <h1 className="txt">{title}</h1>
              <div className="star">
                <FaStar />
                <p className="txt">{rating}</p>
              </div>
            </div>
          </div>
          <div className="side1">
            <div className="sidee">
              <MdLocationOn />
              <p className="txt">{location}</p>
            </div>
            <div className="sidee">
              <BsBriefcaseFill />
              <p className="txt">{employmentType}</p>
            </div>
            <p className="txt">{packagePerAnnum}</p>
          </div>
          <hr />
          <div className="web-link">
            <h1 className="txt">Description</h1>
            <a href={companyWebsiteUrl} className="side">
              <p className="visit">Visit</p>
              <FaExternalLinkAlt className="link-icon" />
            </a>
          </div>
          <p className="desc">{jobDescription}</p>
          <h1 className="txt">Skills</h1>
          <ul className="skill-list">
            {skills.map(skill => (
              <li className="skill" key={skill.name}>
                <img
                  src={skill.image_url}
                  alt={skill.name}
                  className="skill-logo"
                />
                <p>{skill.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="txt">Life at Company</h1>
          <br />
          <div className="office-side">
            <p className="comp-desc">{description}</p>
            <img src={imageUrl} className="office-img" />
          </div>
        </div>
        <h1 className="txt">Similar Jobs</h1>
        <ul>
          {similarJobs.map(each => (
            <SimilarJobDetails details={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobs = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJD()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return <div className="contt">{this.renderJobs()}</div>
  }
}

export default JobDetails
