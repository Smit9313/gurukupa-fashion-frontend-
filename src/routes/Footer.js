import React from 'react';
import '../Style/footer.css'


function Footer() {
  return (
        <div className='footer'>
            <div className='top'>
                <div>
                    <h1>
                        GuruKrupa Fashion
                    </h1>
                    <p>
                        Choose your Favourite Products.
                    </p>
                </div>
                {/* <div>
                    <a href='' className='fa-brands fa-facebook-square'></a>
                    <a href='' className='fa-brands fa-instagram-square'></a>
                    <a href='' className='fa-brands fa-behance-square'></a>
                    <a href='' className='fa-brands fa-twitter-square'></a>
                </div> */}
            </div>
            <div className='bottom'>
                <div>
                    <h4></h4>
                    <a href='/'>Home</a>
                    <a href='/'>Shop</a>
                    <a href='/'>About</a>
                    <a href='/'>Contact Us</a>
                </div>
              <div>
                  <h4>Project</h4>
                  <a href='/'>GitHub</a>
                  <a href='/'>Issues</a>
                  <a href='/'>Project</a>
                  <a href='/'>Twitter</a>
              </div>
              <div>
                  <h4>Project</h4>
                  <a href='/'>Support</a>
                  <a href='/'>Trobuleshooting</a>
                  <a href='/'>Contact Us</a>
              </div>
              <div>
                  <h4>Others</h4>
                  <a href='/'>Tearms of Service</a>
                  <a href='/'>Privacy Policy</a>
                  <a href='/'>License</a>
              </div>
            </div>  

        </div>
  )
}

export default Footer