import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import './index.css'

const JobItem = props => {
  const {data} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = data
  return (
    <Link to={`/jobs/${id}`} className="item">
      <li className="job-card">
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
        <h1 className="desc">Description</h1>
        <p className="desc">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItem
