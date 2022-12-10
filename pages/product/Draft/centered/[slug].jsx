import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';


import Breadcrumb from '~/src/components/partials/product/breadcrumb';
import GalleryDefault from '~/src/components/partials/product/gallery/gallery-default';
import InfoOne from '~/src/components/partials/product/info-tabs/info-one';
import RelatedProductsOne from '~/src/components/partials/product/related/related-one';
import DetailOne from '~/src/components/partials/product/details/ProductDetails';

function ProductCentered () {
    const slug = useRouter().query.slug;
    if ( !slug ) return <div></div>;

    const data = [];
    const loading = false;
    const error = false
    const product = {};
    const related = {};
    const prev = {}
    const next = {};

    if ( error ) {
        return <div></div>
    }

    return (
        <div className="main">
            <Breadcrumb prev={ prev } next={ next } current="Centered" />
            <div className="page-content">
                <div className="container skeleton-body">
                    <div className="product-details-top">
                        <div className={ `row skel-pro-single ${loading ? '' : 'loaded'}` }>
                            <div className="col-md-6">
                                <div className="skel-product-gallery"></div>
                                {
                                    !loading ?
                                        <GalleryDefault product={ product } />
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

                    <RelatedProductsOne products={ related } loading={ loading } />
                </div >
            </div >
        </div >
    )
}

export default ProductCentered