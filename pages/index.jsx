import Reveal from 'react-awesome-reveal';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// Import Apollo Server And Queries

// Import Custom Component
import ALink from '~/components/features/alink';
import OwlCarousel from '~/components/features/owl-carousel';
import SpecialCollection from '~/components/partials/home/special-collection';
import NewsletterModal from "~/components/features/modals/newsletter-modal";

// Import Utils
import { brandSlider, fadeInLeftShorter, fadeInRightShorter, fadeIn, instagramSlider } from '~/utils/data';

function Home () {
    // const { data, loading, error } = useQuery( GET_HOME_DATA );
    const products = []
    const posts = []
    const loading=false


    return (
        <div className={ `main home-page skeleton-body skel-shop-products ${loading ? '' : 'loaded'}` }>
            <div className="intro-slider-container mb-3 mb-lg-5">
                <OwlCarousel adClass="intro-slider owl-nav-inside owl-light" options={ { dots: true, nav: false } }>
                    <div className="intro-slide" style={ { backgroundImage: 'url(images/home/slider/slide-1.jpg)' } }>
                        <div className="container">
                            <div className="intro-content text-center">
                                <h3 className="intro-subtitle cross-txt text-primary">SEASONAL PICKS</h3>
                                <h1 className="intro-title text-white">UNEX</h1>
                                <div className="intro-text text-white">For Men Clothing</div>
                                <div className="intro-action cross-txt">
                                    <ALink href="/shop/sidebar/list" className="btn btn-outline-white">
                                        <span>Discover More</span>
                                    </ALink>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="intro-slide" style={ { backgroundImage: 'url(images/home/slider/slide-2.jpg)' } }>
                        <div className="container">
                            <div className="intro-content text-center">
                                <h3 className="intro-subtitle text-primary cross-txt">Women's Accessories</h3>
                                <h1 className="intro-title text-white">Save up to</h1>
                                <div className="intro-text text-white">30-50% off</div>
                                <div className="intro-action cross-txt">
                                    <ALink href="/shop/sidebar/list" className="btn btn-outline-white">
                                        <span>Discover More</span>
                                    </ALink>
                                </div>
                            </div>
                        </div>
                    </div>

                </OwlCarousel>

                <span className="slider-loader text-white"></span>
            </div>

            <div className="container banners">
                <div className="row">
                    <div className="col-lg-6">
                        <Reveal keyframes={ fadeInLeftShorter } delay={ 150 } duration={ 1000 } triggerOnce>
                            <div className="banner banner-hover lazy-media height-1 banner-overlay">
                                <figure className="mb-0">
                                    <div className="lazy-overlay"></div>
                                    <LazyLoadImage
                                        alt="banner"
                                        src="images/unexStore.jpeg"
                                        threshold={ 200 }
                                        width="100%"
                                        height="auto"
                                        effect="blur"
                                    />
                                </figure>

                                <div className="banner-content">
                                    <h3 className="banner-title text-white"><ALink href={ { pathname: '/shop/sidebar/list', query: { category: 'sweatshirts-and-hoodies' } } }>Sweatshirts & Hoodies</ALink></h3>
                                    <ALink href="/shop/sidebar/list" className="banner-link">Shop Now <i className="icon-long-arrow-right"></i></ALink>
                                </div>
                            </div>
                        </Reveal>
                    </div>

                    <div className="col-sm-6 col-lg-3">
                        <Reveal keyframes={ fadeIn } delay={ 150 } duration={ 1000 } triggerOnce>
                            <div className="banner banner-hover lazy-media height-1 banner-overlay">
                                <figure className="mb-0">
                                    <div className="lazy-overlay"></div>

                                    <LazyLoadImage
                                        alt="banner"
                                        src="images/home/banners/banner-2.jpg"
                                        threshold={ 200 }
                                        height="auto"
                                        width="100%"
                                        effect="blur"
                                    />
                                </figure>

                                <div className="banner-content">
                                    <h3 className="banner-title text-white"><ALink href={ { pathname: '/shop/sidebar/list', query: { category: 'men-jacket' } } }>Men’s Jacket</ALink></h3>
                                    <ALink href="/shop/sidebar/list" className="banner-link">Shop Now <i className="icon-long-arrow-right"></i></ALink>
                                </div>
                            </div>
                        </Reveal>
                    </div>

                    <div className="col-sm-6 col-lg-3">
                        <Reveal keyframes={ fadeInRightShorter } delay={ 150 } duration={ 1000 } triggerOnce>
                            <div className="banner banner-hover lazy-media height-1-2 banner-overlay">
                                <figure className="mb-0">
                                    <div className="lazy-overlay"></div>

                                    <LazyLoadImage
                                        alt="banner"
                                        src="images/home/banners/banner-3.jpg"
                                        threshold={ 200 }
                                        height="auto"
                                        width="100%"
                                        effect="blur"
                                    />
                                </figure>

                                <div className="banner-content">
                                    <h3 className="banner-title text-white"><ALink href={ { pathname: '/shop/sidebar/list', query: { category: 'women-jacket' } } }>Women’s jackets</ALink></h3>
                                    <ALink href="/shop/sidebar/list" className="banner-link">Shop Now <i className="icon-long-arrow-right"></i></ALink>
                                </div>
                            </div>

                            <div className="banner banner-hover lazy-media height-1-2 banner-overlay">
                                <figure className="mb-0">
                                    <div className="lazy-overlay"></div>

                                    <LazyLoadImage
                                        alt="banner"
                                        src="images/home/banners/banner-4.jpg"
                                        threshold={ 200 }
                                        width="100%"
                                        height="auto"
                                        effect="blur"
                                    />
                                </figure>

                                <div className="banner-content">
                                    <h3 className="banner-title text-white"><ALink href={ { pathname: '/shop/sidebar/list', query: { category: 'accessories' } } }>Accessories</ALink></h3>
                                    <ALink href="/shop/sidebar/list" className="banner-link">Shop Now <i className="icon-long-arrow-right"></i></ALink>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>


            <div className="container">
                <SpecialCollection products={ products } posts={ posts } />

                <hr className="mt-0 mb-4" />
                <h2 className="title text-center brands">Shop by Brands</h2>

                <OwlCarousel adClass="mt-3 mb-4 owl-simple" options={ brandSlider }>
                    <a href="#" className="brand">
                        <img src="images/brands/1.png" alt="Brand Name" />
                    </a>

                    <a href="#" className="brand">
                        <img src="images/brands/2.png" alt="Brand Name" />
                    </a>

                    <a href="#" className="brand">
                        <img src="images/brands/3.png" alt="Brand Name" />
                    </a>

                    <a href="#" className="brand">
                        <img src="images/brands/4.png" alt="Brand Name" />
                    </a>

                    <a href="#" className="brand">
                        <img src="images/brands/5.png" alt="Brand Name" />
                    </a>

                    <a href="#" className="brand">
                        <img src="images/brands/6.png" alt="Brand Name" />
                    </a>

                    <a href="#" className="brand">
                        <img src="images/brands/7.png" alt="Brand Name" />
                    </a>
                </OwlCarousel>
            </div>

            <div className="bg-lighter pt-5 pb-5">
                <div className="container">
                    <div className="heading text-center">
                        <h2 className="title">Let Us Inspire You On Instagram</h2>
                        <p className="title-desc">Donec nec justo eget felis facilisis fermentum.</p>
                    </div>

                    <OwlCarousel adClass="owl-simple mb-3" options={ instagramSlider }>
                        <div className="instagram-feed lazy-media">
                            <figure className="mb-0">
                                <LazyLoadImage
                                    alt="instagram"
                                    src="images/home/instagram/1.jpg"
                                    threshold={ 200 }
                                    width="100%"
                                    height="auto"
                                    effect="blur"
                                />
                            </figure>

                            <div className="instagram-feed-content">
                                <a href="#" onClick={ e => { e.preventDefault(); } }><i className="icon-heart-o"></i>466</a>
                                <a href="#" onClick={ e => { e.preventDefault(); } }><i className="icon-comments"></i>65</a>
                            </div>
                        </div>

                        <div className="instagram-feed lazy-media">
                            <figure className="mb-0">
                                <LazyLoadImage
                                    alt="instagram"
                                    src="images/home/instagram/2.jpg"
                                    threshold={ 200 }
                                    width="100%"
                                    height="auto"
                                    effect="blur"
                                />
                            </figure>

                            <div className="instagram-feed-content">
                                <a href="#" onClick={ e => { e.preventDefault(); } }><i className="icon-heart-o"></i>39</a>
                                <a href="#" onClick={ e => { e.preventDefault(); } }><i className="icon-comments"></i>78</a>
                            </div>
                        </div>

                        <div className="instagram-feed lazy-media">
                            <figure className="mb-0">
                                <LazyLoadImage
                                    alt="instagram"
                                    src="images/home/instagram/3.jpg"
                                    threshold={ 200 }
                                    width="100%"
                                    height="auto"
                                    effect="blur"
                                />
                            </figure>

                            <div className="instagram-feed-content">
                                <a href="#" onClick={ e => { e.preventDefault(); } }><i className="icon-heart-o"></i>691</a>
                                <a href="#" onClick={ e => { e.preventDefault(); } }><i className="icon-comments"></i>87</a>
                            </div>
                        </div>

                        <div className="instagram-feed lazy-media">
                            <figure className="mb-0">
                                <LazyLoadImage
                                    alt="instagram"
                                    src="images/home/instagram/4.jpg"
                                    threshold={ 200 }
                                    width="100%"
                                    height="auto"
                                    effect="blur"
                                />
                            </figure>

                            <div className="instagram-feed-content">
                                <a href="#" onClick={ e => { e.preventDefault(); } }><i className="icon-heart-o"></i>508</a>
                                <a href="#" onClick={ e => { e.preventDefault(); } }><i className="icon-comments"></i>124</a>
                            </div>
                        </div>

                        <div className="instagram-feed lazy-media">
                            <figure className="mb-0">
                                <LazyLoadImage
                                    alt="instagram"
                                    src="images/home/instagram/5.jpg"
                                    threshold={ 200 }
                                    width="100%"
                                    height="auto"
                                    effect="blur"
                                />
                            </figure>

                            <div className="instagram-feed-content">
                                <a href="#" onClick={ e => { e.preventDefault(); } }><i className="icon-heart-o"></i>433</a>
                                <a href="#" onClick={ e => { e.preventDefault(); } }><i className="icon-comments"></i>27</a>
                            </div>
                        </div>
                    </OwlCarousel>

                    <div className="more-container text-center">
                        <a href="https://www.instagram.com/unex_city_active/"  className="btn btn-outline-primary-2 btn-more" >@UNEX Instagram</a>
                    </div>
                </div>
            </div>
            <NewsletterModal />
        </div>
    )
}

export default Home