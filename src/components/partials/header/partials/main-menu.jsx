import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import ALink from '~/src/components/features/alink';
import axiosInstance from '~/src/utils/axios/axiosInstance';
import { APIS } from '~/src/utils/ServiceUrls';

function MainMenu () {
    const router = useRouter();
    let path = router.asPath;
    const { i18n } = useTranslation('home')
    const [categories,setCategories]=useState([])
    useEffect(() => {
        if (categories.length == 0)
            getCategories()
    }, [i18n])

    const getCategories = async () => {
        let response = await axiosInstance.get(APIS.CATEGORIES.LIST, {
            headers: {
                'common': {
                    'accept-language': router.language ?? router.locale
                }
            }
        })
        setCategories(response.data)
    }

    return (
        <nav className="main-nav">
            <ul className="menu sf-arrows">
                <li className={`megamenu-container ${path === '/' ? 'active' : ''}`} id="menu-home">
                    <ALink href="/" >Home</ALink>
                </li>
                <li className={path.indexOf("/shop") > -1 ? 'active' : ''}>
                    <ALink href="/shop/list"  >Shop</ALink>
                </li>
                <li className={path.indexOf("product/") > -1 ? 'active' : ''}>
                    <ALink href="/product/default/dark-yellow-lace-cut-out-swing-dress" className="sf-with-ul">Product</ALink>

                    <div className="megamenu megamenu-sm">
                        <div className="row no-gutters">
                            <div className="col-md-6">
                                <div className="menu-col">
                                    {/* className={path.indexOf("product/default") > -1 ? 'active' : ''} */}
                                    <ul>
                                        {categories.map((item) => {
                                            return <li key={item?.id} ><ALink href="/shop/category">{item?.name}</ALink></li>

                                     
                                        })
                                            
                                      }                                    </ul>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="banner banner-overlay">
                                    <ALink href="/product/centered/dark-yellow-lace-cut-out-swing-dress">
                                        <img src="images/menu/banner-2.jpg" alt="Banner" />

                                        <div className="banner-content banner-content-bottom">
                                            <div className="banner-title text-white">New Trends<br /><span><strong> {(new Date()).getFullYear()}</strong></span></div>
                                        </div>
                                    </ALink>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>

                <li className={path.indexOf("About/") > -1 ? 'active' : ''}>
                    <ALink href="/about">About</ALink>
                </li>
                <li className={path.indexOf("About/") > -1 ? 'active' : ''}>
                    <ALink href="/contact">Contact</ALink>
                </li>
              
            </ul>
        </nav>
    );
}

export default MainMenu;

{/* <li className={ path.indexOf( "element" ) > -1 ? 'active' : '' }>
                    <ALink href="/elements" className="sf-with-ul">Elements</ALink>

                    <ul>
                        <li className={ path.indexOf( "elements/products" ) > -1 ? "active" : '' }><ALink href="/elements/products">Products</ALink></li>
                        <li className={ path.indexOf( "elements/typography" ) > -1 ? "active" : '' }><ALink href="/elements/typography">Typography</ALink></li>
                        <li className={ path.indexOf( "elements/titles" ) > -1 ? "active" : '' }><ALink href="/elements/titles">Titles</ALink></li>
                        <li className={ path.indexOf( "elements/banners" ) > -1 ? "active" : '' }><ALink href="/elements/banners">Banners</ALink></li>
                        <li className={ path.indexOf( "elements/categories" ) > -1 ? "active" : '' }><ALink href="/elements/categories">Product Category</ALink></li>
                        <li className={ path.indexOf( "elements/video-banners" ) > -1 ? "active" : '' }><ALink href="/elements/video-banners">Video Banners</ALink></li>
                        <li className={ path.indexOf( "elements/buttons" ) > -1 ? "active" : '' }><ALink href="/elements/buttons">Buttons</ALink></li>
                        <li className={ path.indexOf( "elements/accordions" ) > -1 ? "active" : '' }><ALink href="/elements/accordions">Accordions</ALink></li>
                        <li className={ path.indexOf( "elements/tabs" ) > -1 ? "active" : '' }><ALink href="/elements/tabs">Tabs</ALink></li>
                        <li className={ path.indexOf( "elements/testimonials" ) > -1 ? "active" : '' }><ALink href="/elements/testimonials">Testimonials</ALink></li>
                        <li className={ path.indexOf( "elements/blog-posts" ) > -1 ? "active" : '' }><ALink href="/elements/blog-posts">Blog Posts</ALink></li>
                        <li className={ path.indexOf( "elements/cta" ) > -1 ? "active" : '' }><ALink href="/elements/cta">Call to Action</ALink></li>
                        <li className={ path.indexOf( "elements/icon-boxes" ) > -1 ? "active" : '' }><ALink href="/elements/icon-boxes">Icon Boxes</ALink></li>
                    </ul>
                </li> */}