import { useRouter } from 'next/router';
import StickyBox from 'react-sticky-box';


import Breadcrumb from '~/src/components/partials/product/breadcrumb';
import GalleryDefault from '~/src/components/partials/product/gallery/gallery-default';
import DetailOne from '~/src/components/partials/product/details/ProductDetails';
import InfoOne from '~/src/components/partials/product/info-tabs/info-one';
import Sidebar from '~/src/components/partials/product/sidebar/product-sidebar';
import RelatedProductsOne from '~/src/components/partials/product/related/related-one';

function ProductSidebar () {
    const slug = useRouter().query.slug;
    if ( !slug ) return <div></div>;

    const product = [];
    const related = [];
    const prev = []
    const next = [];
    const data = [];
    const loading = false;
    const error = false

    if ( error ) {
        return <div></div>
    }

    return (
        <div className="main">
            <Breadcrumb prev={ prev } next={ next } current="Sidebar" />
            <div className="page-content">
                <div className="container skeleton-body horizontal">
                    <div className="row">
                        <div className="col-lg-9">
                            <div className="product-details-top">
                                <div className={ `row skel-pro-single ${loading ? '' : 'loaded'}` }>
                                    <div className="col-md-6">
                                        <div className="skel-product-gallery"></div>
                                        {
                                            !loading ?
                                                <GalleryDefault product={ product } adClass="" />
                                                : ""
                                        }
                                    </div>

                                    <div className="col-md-6">
                                        <div className="entry-summary row">
                                            <div className="col-md-12">
                                                <div className="entry-summary1 mt-2 mt-md-0"></div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="entry-summary2"></div>
                                            </div>
                                        </div>
                                        {
                                            !loading ?
                                                <DetailOne product={ product } />
                                                : ""
                                        }
                                    </div>
                                </div>
                            </div>
                            {
                                loading ?
                                    <div className="skel-pro-tabs"></div>
                                    :
                                    <InfoOne product={ product } />
                            }
                            <div className="nav-none">
                                <RelatedProductsOne products={ related } loading={ loading } />
                            </div>
                        </div>
                        <div className="col-lg-3 skeleton-body">
                            <StickyBox className={ `sticky-content skel-pro-single ${loading ? '' : 'loaded'}` } offsetTop={ 70 }>
                                <div className="skel-widget"></div>
                                <div className="skel-widget"></div>
                                <Sidebar products={ related } loading={ loading } />
                            </StickyBox>
                        </div>
                    </div>
                </div >
            </div >
        </div >
    )
}

export default ProductSidebar
