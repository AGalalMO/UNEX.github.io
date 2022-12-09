import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import SlideToggle from 'react-slide-toggle';

import ALink from '~/src/components/features/alink';
import useAuth from '~/src/hooks/useAuth';

function MobileMenu () {
    const { isAuthenticated, user } = useAuth()
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    useEffect(() => {
        router.events.on('routeChangeComplete', hideMobileMenu);
    }, [])

    function hideMobileMenu () {
        document.querySelector('body').classList.remove('mmenu-active');
    }

    function onSearchChange (e) {
        setSearchTerm(e.target.value);
    }

    function onSubmitSearchForm (e) {
        e.preventDefault();
        router.push({
            pathname: '/shop/3cols',
            query: {
                searchTerm: searchTerm,
                category: ""
            }
        });
    }

    return (
        <div className="mobile-menu-container">
            <div className="mobile-menu-wrapper">
                <span className="mobile-menu-close" onClick={hideMobileMenu}><i className="icon-close"></i></span>

                <form action="#" method="get" onSubmit={onSubmitSearchForm} className="mobile-search">
                    <label htmlFor="mobile-search" className="sr-only">Search</label>
                    <input type="text" className="form-control" value={searchTerm} onChange={onSearchChange} name="mobile-search" id="mobile-search" placeholder="Search product ..." required />
                    <button className="btn btn-primary" type="submit"><i className="icon-search"></i></button>
                </form>

                <nav className="mobile-nav">
                    <ul className="mobile-menu">
                        <SlideToggle collapsed={true}>
                            <li style={{ textAlign: 'center', fontWeight: '700' }} >
                                <ALink href={isAuthenticated ? '' : "/auth/signin"}>
                                    {isAuthenticated ? user?.name : 'LOGIN'}
                                    <span onClick={(e) => { onToggle(e); e.preventDefault() }}></span>
                                </ALink>
                            </li>
                        </SlideToggle>
                        <SlideToggle collapsed={true}>
                            <li>
                                <ALink href="/">
                                    Home
                                    <span onClick={(e) => { onToggle(e); e.preventDefault() }}></span>
                                </ALink>
                            </li>
                        </SlideToggle>
                        <SlideToggle collapsed={true}>
                            <li >
                                <ALink href="/shop/3cols">
                                    Shop
                                    <span onClick={(e) => { onToggle(e); e.preventDefault() }}></span>
                                </ALink>
                            </li>
                        </SlideToggle>
                        <SlideToggle collapsed={true}>
                            {({ onToggle, setCollapsibleElement, toggleState }) => (
                                <li className={toggleState.toLowerCase() == 'expanded' ? 'open' : ''}>
                                    <ALink href="/product/default/dark-yellow-lace-cut-out-swing-dress" className="sf-with-ul">
                                        Product
                                        <span className="mmenu-btn" onClick={(e) => { onToggle(e); e.preventDefault() }}></span>
                                    </ALink>
                                    <ul ref={setCollapsibleElement}>
                                        <li><ALink href="/product/default/dark-yellow-lace-cut-out-swing-dress">Default</ALink></li>
                                        <li><ALink href="/product/centered/beige-ring-handle-circle-cross-body-bag">Centered</ALink></li>
                                        <li><ALink href="/product/extended/yellow-tie-strap-block-heel-sandals"><span>Extended Info<span className="tip tip-new">New</span></span></ALink></li>
                                        <li><ALink href="/product/gallery/beige-metal-hoop-tote-bag">Gallery</ALink></li>
                                        <li><ALink href="/product/sticky/brown-faux-fur-longline-coat">Sticky Info</ALink></li>
                                        <li><ALink href="/product/sidebar/beige-v-neck-button-cardigan">Boxed With Sidebar</ALink></li>
                                        <li><ALink href="/product/fullwidth/black-faux-leather-chain-trim-sandals">Full Width</ALink></li>
                                        <li><ALink href="/product/masonry/black-denim-dungaree-dress">Masonry Sticky Info</ALink></li>
                                    </ul>
                                </li>
                            )}
                        </SlideToggle>

                        <SlideToggle collapsed={true}>
                            <li >
                                <ALink href="/about">
                                    About
                                    <span onClick={(e) => { onToggle(e); e.preventDefault() }}></span>
                                </ALink>
                            </li>
                        </SlideToggle>
                        <SlideToggle collapsed={true}>
                            <li >
                                <ALink href="/contact">
                                    Contact
                                    <span onClick={(e) => { onToggle(e); e.preventDefault() }}></span>
                                </ALink>
                            </li>
                        </SlideToggle>



                    </ul>
                </nav>


            </div>
        </div>
    )
}

export default React.memo(MobileMenu);