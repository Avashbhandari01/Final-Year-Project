import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import bootstrapThemesImg from '../images/bootstrap-themes.png';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <>
      <Navbar />
      <div className="container col-xxl-8 px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            <img src={bootstrapThemesImg} className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy" />
          </div>
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold lh-1 mb-3">Guardian Portal System</h1>
            <p className="lead">Guardian Portal System is a online communication system through which parents can track their child progress in college/school such as marks, attendance, teacher remarks, exam results etc.</p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <Link to='/login'><button type="button" className="btn btn-primary btn-lg px-4 me-md-2">Sign In</button></Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default LandingPage