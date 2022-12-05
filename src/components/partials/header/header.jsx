import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

import ALink from '~/src/components/features/alink';
import HeaderSearch from '~/src/components/partials/header/partials/header-search';
import WishlistMenu from '~/src/components/partials/header/partials/wishlist-menu';
import CartMenu from '~/src/components/partials/header/partials/cart-menu';
import MainMenu from '~/src/components/partials/header/partials/main-menu';
import StickyHeader from '~/src/components/features/sticky-header';
import { Typography } from '@mui/material';
import { appWithTranslation, useTranslation } from "next-i18next";
import { route } from 'next/dist/next-server/server/router';

function Header (props) {
    const router = useRouter();
    const [ containerClass, setContainerClass ] = useState( 'container' );

    function openMobileMenu () {
        document.querySelector( 'body' ).classList.add( 'mmenu-active' );
    }

    useEffect( () => {
        setContainerClass( router.asPath.includes( 'fullwidth' ) ? 'container-fluid' : 'container' );
    }, [ router.asPath ] );

    return (
        <header className={ `header header-11 ${props.adClass}` }>
            <StickyHeader>
                <div className="header-middle sticky-header">
                    <div className={ containerClass }>
                        <div className="header-left">
                            <MainMenu />

                            <button className="mobile-menu-toggler" onClick={ openMobileMenu }>
                                <span className="sr-only">Toggle mobile menu</span>
                                <i className="icon-bars"></i>
                            </button>

                        </div>

                        <div className="header-center">
                            <ALink href="/" className="logo">
                                <img src="images/home/Logo.png" alt="Molla Logo" width="82" height="25" />
                            </ALink>
                        </div>

                        <div className="header-right">
                            <HeaderSearch />

                            <WishlistMenu />

                            <CartMenu />
                            <Typography sx={{marginLeft:'2.3rem',color:'white',fontSize:'14px',cursor:'pointer'}} onClick={() => {
                               
                            }}>{router.locale=='en'?'العربية':"EN"}</Typography>
                            
                        </div>
                    </div>
                </div>
            </StickyHeader>
        </header>
    )
}
export default  Header

