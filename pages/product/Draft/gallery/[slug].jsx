import { useRouter } from 'next/router';


import Breadcrumb from '~/src/components/partials/product/breadcrumb';
import GalleryExtended from '~/src/components/partials/product/gallery/Draft/gallery-extended';
import InfoOne from '~/src/components/partials/product/info-tabs/info-one';
import RelatedProductsOne from '~/src/components/partials/product/related/related-one';
import DetailOne from '~/src/components/partials/product/details/ProductDetails';

function ProductDefault () {
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
            <Breadcrumb prev={ prev } next={ next } current="Gallery" />
            <div className="page-content">
                <div className="container skeleton-body">
                    <div className="product-details-top">
                        <div className={ `skel-pro-single gallery mb-4 ${loading ? '' : 'loaded'}` }>
                            <div className="row">
                                <div className="col-12">
                                    <div className="skel-product-gallery"></div>
                                    {
                                        !loading ?
                                            <GalleryExtended product={ product } />
                                            : ""
                                    }
                                </div>

                                <div className="col-12">
                                    <div className="entry-summary row mt-5">
                                        <div className="col-md-12">
                                            <div className="entry-summary1"></div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="entry-summary2"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {
                            !loading ?
                                <DetailOne product={ product } />
                                : ""
                        }
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

export default ProductDefault
