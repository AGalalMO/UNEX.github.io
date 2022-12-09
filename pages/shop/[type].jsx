import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import StickyBox from 'react-sticky-box';

import ALink from '~/src/components/features/alink';
import PageHeader from '~/src/components/features/page-header';
import ShopListOne from '~/src/components/partials/shop/list/shop-list-one';
import Pagination from '~/src/components/features/pagination';
import ShopSidebarOne from '~/src/components/partials/shop/sidebar/shop-sidebar-one';
import axiosInstance from '~/src/utils/axios/axiosInstance';
import { APIS } from '~/src/utils/ServiceUrls';


function ShopGrid () {


    const router = useRouter();
    const type = router.query.type;
    const query = router.query;
    const [firstLoading, setFirstLoading] = useState(false);
    const [perPage, setPerPage] = useState(5);
    const [pageTitle, setPageTitle] = useState('List');
    const [toggle, setToggle] = useState(false);
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    useEffect(() => {
        getProducts()
        getCategories()
    }, [])
    const getProducts = async () => {
        let response = await axiosInstance.get('https://dummyjson.com/products')
        setProducts(response.data.products)
    }
    const getCategories = async () => {
        let response = await axiosInstance.get(APIS.CATEGORIES.LIST, {
            headers: {
                'common': {
                    'accept-language': router?.locale ?? 'en'
                }
            }
        })
        console.log("response", response.data)
        setCategories(response.data)
    }
    const totalCount = []

    useEffect(() => {
        window.addEventListener("resize", resizeHandle);
        resizeHandle();
        return () => {
            window.removeEventListener("resize", resizeHandle);
        }
    }, [])

    function resizeHandle () {
        if (document.querySelector("body").offsetWidth < 992)
            setToggle(true);
        else
            setToggle(false);
    }



    useEffect(() => {
        if (type == 'list') {
            setPageTitle('Shop List');
            setPerPage(5);
        } else if (type == '2cols') {
            setPageTitle('Shop List');

            setPerPage(6);
        } else if (type == '3cols') {
            setPageTitle('Shop List');

            setPerPage(9);
        }
    }, [type])

    function onSortByChange (e) {
        let queryObject = router.query;
        let url = router.pathname.replace('[type]', query.type) + '?';
        for (let key in queryObject) {
            if (key !== "type" && key !== "sortBy") {
                url += key + '=' + queryObject[key] + '&';
            }
        }

        router.push(url + 'sortBy=' + e.target.value);
    }

    function toggleSidebar () {
        if (
            document
                .querySelector('body')
                .classList.contains('sidebar-filter-active')
        ) {
            document
                .querySelector('body')
                .classList.remove('sidebar-filter-active');
        } else {
            document
                .querySelector('body')
                .classList.add('sidebar-filter-active');
        }
    }

    function hideSidebar () {
        document
            .querySelector('body')
            .classList.remove('sidebar-filter-active');
    }



    return (
        <main className="main shop">
            <PageHeader title={pageTitle} subTitle="Shop" />
            <BreadCrumb query={query} pageTitle={pageTitle} />

            <div className="page-content">
                <div className="container">
                    <div className="row skeleton-body">
                        <div
                            className={`col-lg-9 skel-shop-products ${'loaded'}`}
                        >
                            <div className="toolbox">
                                <div className="toolbox-right">
                                    <div className="toolbox-sort">
                                        <label htmlFor="sortby">Sort by:</label>
                                        <div className="select-custom">
                                            <select
                                                name="sortby"
                                                id="sortby"
                                                className="form-control"
                                                onChange={onSortByChange}
                                                value={query.sortBy ? query.sortBy : 'default'}
                                            >
                                                <option value="default">Default</option>
                                                <option value="featured">Most Popular</option>
                                                <option value="rating">Most Rated</option>
                                                <option value="new">Date</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="toolbox-layout">


                                        <ALink
                                            href="/shop/2cols"
                                            className={`btn-layout ${type == '2cols' ? 'active' : ''}`}
                                            scroll={false}
                                        >
                                            <svg width="10" height="10">
                                                <rect x="0" y="0" width="4" height="4" />
                                                <rect x="6" y="0" width="4" height="4" />
                                                <rect x="0" y="6" width="4" height="4" />
                                                <rect x="6" y="6" width="4" height="4" />
                                            </svg>
                                        </ALink>

                                        <ALink
                                            href="/shop/3cols"
                                            className={`btn-layout ${type == '3cols' ? 'active' : ''}`}
                                            scroll={false}
                                        >
                                            <svg width="16" height="10">
                                                <rect x="0" y="0" width="4" height="4" />
                                                <rect x="6" y="0" width="4" height="4" />
                                                <rect x="12" y="0" width="4" height="4" />
                                                <rect x="0" y="6" width="4" height="4" />
                                                <rect x="6" y="6" width="4" height="4" />
                                                <rect x="12" y="6" width="4" height="4" />
                                            </svg>
                                        </ALink>


                                    </div>
                                </div>
                            </div >

                            <ShopListOne products={products} perPage={perPage} loading={false}></ShopListOne>

                            {
                                totalCount > perPage ?
                                    <Pagination perPage={perPage} total={totalCount}></Pagination>
                                    : ""
                            }
                        </div >

                        <aside className={`col-lg-3 skel-shop-sidebar order-lg-first skeleton-body loaded`}>
                            <div className="skel-widget"></div>
                            <div className="skel-widget"></div>
                            <div className="skel-widget"></div>
                            <div className="skel-widget"></div>
                            <StickyBox className="sticky-content" offsetTop={70}>
                                <ShopSidebarOne toggle={toggle} categories={categories} />
                            </StickyBox>
                            {
                                toggle ?
                                    <button className="sidebar-fixed-toggler" onClick={toggleSidebar}>
                                        <i className="icon-cog"></i>
                                    </button>
                                    : ''
                            }
                            <div className="sidebar-filter-overlay" onClick={hideSidebar}></div>
                        </aside >
                    </div >
                </div >
            </div >
        </main >
    )
}

export default ShopGrid
const BreadCrumb = ({ pageTitle, query }) => {
    return (<nav className="breadcrumb-nav mb-2">
        <div className="container">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <ALink href="/">Home</ALink>
                </li>
                <li className="breadcrumb-item">
                    <ALink href="/shop/3cols">Shop</ALink>
                </li>
                <li className="breadcrumb-item active">{pageTitle}</li>
                {
                    query.search ?
                        <li className="breadcrumb-item">
                            <span>Search - {query.searchTerm}</span>
                        </li>
                        : ""
                }
            </ol>
        </div>
    </nav>)
}