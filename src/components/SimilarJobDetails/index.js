import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobDetails = props => {
  const {details} = props
  const {
    companyLogoUrl,
    title,
    rating,
    location,
    employmentType,
    jobDescription,
  } = details
  return (
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
      </div>
      <hr />
      <h1 className="desc">Description</h1>
      <p className="desc">{jobDescription}</p>
    </div>
  )
}

export default SimilarJobDetails
