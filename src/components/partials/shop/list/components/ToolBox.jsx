import { useRouter } from "next/router";
import ALink from "~/src/components/features/alink";

export const ToolBox = ({type}) => {
    const router = useRouter();
    const query = router.query;

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
    return (
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
                            <option value="rating">Default</option>

                            <option value="rating">Price High to Low</option>
                            <option value="new">Price Low to High</option>
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
    )
}