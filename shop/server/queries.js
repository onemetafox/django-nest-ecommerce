import gql from 'graphql-tag';

const DEMO = 4;

const PRODUCT_SIMPLE = gql`
  fragment ProductSimple on Product {
    name
    slug
    price
    ratings
    reviews
    is_hot
    is_new
    is_out_of_stock
    until
    stock
    pictures {
      url
      width
      height
    }
    small_pictures {
      url
      width
      height
    }
    categories {
      name
      slug
    }
    variants {
      price
      sale_price
    }
  }
`;

const PRODUCT_SMALL = gql`
  fragment ProductSmall on Product {
    id
    name
    slug
    price
    ratings
    pictures {
      url
      width
      height
    }
    small_pictures {
      url
      width
      height
    }
    variants {
      price
      sale_price
    }
  }
`;

export const GET_PRODUCTS = gql`
    query products($search: String $colors: [String], $sizes: [String], $min_price: Int, $max_price: Int, $category: String, $tag: String, $sortBy: String, $from: Int, $to: Int, $list: Boolean = false) {
        products(demo: ${DEMO}, search: $search, colors: $colors, sizes: $sizes, min_price: $min_price, max_price: $max_price, category: $category, tag: $tag, sortBy: $sortBy, from: $from, to: $to ) {
            data {
                short_description @include(if: $list)
                ...ProductSimple
            }
            total
            categoryFamily {
                slug
                name
            }
        }
    }
    ${PRODUCT_SIMPLE}
`;

export const GET_SPECIAL_PRODUCTS = gql`
    query specialProducts($featured: Boolean = false, $bestSelling: Boolean = false, $topRated: Boolean = false, $latest: Boolean = false, $count: Int) {
        specialProducts(demo: ${DEMO}, featured: $featured, bestSelling: $bestSelling, topRated: $topRated, latest: $latest, count: $count) {
            featured @include(if: $featured) {
                ...ProductSmall
            }
            bestSelling @include(if: $bestSelling) {
                ...ProductSmall
            }
            topRated @include(if: $topRated) {
                ...ProductSmall
            }
            latest @include(if: $latest) {
                ...ProductSmall
            }
        }
    }
    ${PRODUCT_SMALL}
`;

export const GET_PRODUCT = gql`
    query product($slug: String!, $onlyData: Boolean = false) {
        product(demo: ${DEMO}, slug: $slug, onlyData: $onlyData) {
            data {
                id
                slug
                name
                price
                short_description
                until
                sku
                stock
                ratings
                reviews
                sale_count
                is_hot
                is_new
                is_sale
                is_out_of_stock
                stock
                pictures {
                    url
                    width
                    height
                }
                small_pictures {
                    url
                    width
                    height
                }
                large_pictures {
                    url
                    width
                    height
                }
                categories {
                    name
                    slug
                }
                tags {
                    name
                    slug
                }
                variants {
                    price
                    sale_price
                    color {
                        name
                        color
                        thumb {
                            url
                            width
                            height
                        }
                    }
                    size {
                        name
                        size
                        thumb {
                            url
                            width
                            height
                        }
                    }
                }
            }
            prev @skip(if: $onlyData) {
                slug
                name
                small_pictures {
                    url
                    width
                    height
                }
            }
            next @skip(if: $onlyData) {
                slug
                name
                small_pictures {
                    url
                    width
                    height
                }
            }
            related @skip(if: $onlyData) {
                ...ProductSimple
            }
        }
    }
    ${PRODUCT_SIMPLE}
`;

export const GET_SHOP_SIDEBAR_DATA = gql`
    query shopSidebarData($featured: Boolean = false) {
        shopSidebarData(demo: ${DEMO}, featured: $featured) {
            categories {
                name
                slug
                parent
                count
            }
            featured @include(if: $featured) {
                slug
                name
                price
                ratings
                small_pictures {
                    url
                    width
                    height
                }
                variants {
                    price
                }
            }
        }
    }
`;

export const GET_POSTS = gql`
    query posts($category: String, $from: Int, $to: Int) {
        posts(demo: ${DEMO}, category: $category, from: $from, to: $to ) {
            data {
                title
                slug
                date
                comments
                content
                picture {
                    url
                    width
                    height
                }
                video
            }
            total
        }
    }
`;

export const GET_POST = gql`
    query post($slug: String!) {
        post(demo: ${DEMO}, slug: $slug) {
            data {
                title
                slug
                author
                date
                comments
                content
                type
                picture {
                    url
                    width
                    height
                }
                video
                categories {
                    name
                    slug
                }
            }
            related {
                title
                slug
                date
                comments
                content
                picture {
                    url
                    width
                    height
                }
                video
            }
        }
    }
`;

export const GET_POST_SIDEBAR_DATA = gql`
    query postSidbarData {
        postSidebarData(demo: ${DEMO}) {
            categories {
                name
                slug
            }
            recent {
                title
                slug
                date
                picture {
                    url
                    width
                    height
                }
            }
        }
    }
`;

export const GET_HOME_DATA = gql`
    query indexData($productsCount: Int, $postsCount: Int) {
        specialProducts(demo: ${DEMO}, featured: true, bestSelling: true, topRated: true, latest: true, count: $productsCount) {
            featured {
                ...ProductSimple
            }
            bestSelling {
                ...ProductSimple
            }
            topRated {
                ...ProductSimple
            }
            onSale {
                ...ProductSimple
            }
            latest {
                ...ProductSimple
            }
        }
        posts(demo: ${DEMO}, to: $postsCount) {
            data {
                title
                slug
                date
                comments
                content
                picture {
                    url
                    width
                    height
                }
                video
            }
        }
    }
    ${PRODUCT_SIMPLE}
`;
