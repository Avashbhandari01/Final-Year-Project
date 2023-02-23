function Footer() {
    return (
        <div className="container">
            <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                <div className="col-md-4 d-flex align-items-center">
                    <span className="mb-3 mb-md-0 text-muted">&copy; 2022 Guardian Portal System, Inc. All rights reserved.</span>
                </div>

                <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                    <li className="ms-3"><a className="text-muted" href="https://twitter.com/"><svg className="bi" width="24" height="24"><use xlinkHref="#twitter" /></svg></a></li>
                    <li className="ms-3"><a className="text-muted" href="https://www.instagram.com/avash_bdr/"><svg className="bi" width="24" height="24"><use xlinkHref="#instagram" /></svg></a></li>
                    <li className="ms-3"><a className="text-muted" href="https://www.facebook.com/"><svg className="bi" width="24" height="24"><use xlinkHref="#facebook" /></svg></a></li>
                </ul>
            </footer>
        </div>
    )
}

export default Footer