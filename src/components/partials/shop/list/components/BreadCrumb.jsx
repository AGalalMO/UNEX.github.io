import ALink from "~/src/components/features/alink";
export const BreadCrumb = ({ pageTitle, query }) => {
  return (
    <nav className='breadcrumb-nav mb-2'>
      <div className='container'>
        <ol className='breadcrumb'>
          <li className='breadcrumb-item'>
            <ALink href='/'>Home</ALink>
          </li>
          <li className='breadcrumb-item'>
            <ALink href='/shop/3cols'>Shop</ALink>
          </li>
          <li className='breadcrumb-item active'>{pageTitle}</li>
          {query?.search ? (
            <li className='breadcrumb-item'>
              <span>Search - {query.searchTerm}</span>
            </li>
          ) : (
            ""
          )}
        </ol>
      </div>
    </nav>
  );
};
