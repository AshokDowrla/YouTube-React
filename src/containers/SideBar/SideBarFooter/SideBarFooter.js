import React from 'react'
import "./SideBarFooter.scss"
const SideBarFooter = () => {
    return (
        <React.Fragment>
            <div className='footer-block'>
                <div>About Press Copyright</div>
                <div>Contact us  Creators</div>
                <div>Advertise Developers</div>
                <div>Legal</div>
            </div>
            <div className='footer-block'>
                <div>Terms Privacy Policy & Safety</div>

                <div>Test new features</div>
            </div>
            <div className='footer-block'>
                <div>© Productioncoder.com - A Youtube clone for educational purposes under fair use.</div>
            </div>
        </React.Fragment>
    )
}

export default SideBarFooter