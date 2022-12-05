import ALink from '~/src/components/features/alink';
import OwlCarousel from '~/src/components/features/owl-carousel';
function ImageBanner () {

    const Images = [
        {
            url: 'images/Banner1.jpeg',
            headText: 'UNEX',
            subHeadText: 'For Men Clothing',
            category: 'SEASONAL PICKS',
            linkTo: ''
        },
        {
            url: 'images/home/slider/slide-2.jpg',
            headText: 'Save up to',
            subHeadText: '30-50% off',
            category: "Women's Accessories",
            linkTo: ''

        },

    ]
    return (
        <div className="intro-slider-container mb-3 mb-lg-5">
            <OwlCarousel adClass="intro-slider owl-nav-inside owl-light" options={{ dots: true, nav: false }}>
                {Images.map((item) => {
                    return (<div className="intro-slide" style={{ backgroundImage: `url(${item.url})` }}>
                        <div className="container">
                            <div className="intro-content text-center">
                                <h3 className="intro-subtitle text-primary cross-txt">{item.category}</h3>
                                <h1 className="intro-title text-white">{item.headText}</h1>
                                <div className="intro-text text-white">{item.subHeadText}</div>
                                <div className="intro-action cross-txt">
                                    <ALink href={item.linkTo} className="btn btn-outline-white">
                                        <span>Discover More</span>
                                    </ALink>
                                </div>
                            </div>
                        </div>
                    </div>)
                })}

            </OwlCarousel>

            <span className="slider-loader text-white"></span>
        </div>
    )
}

export default ImageBanner