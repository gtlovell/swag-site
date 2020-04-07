/** @jsx jsx */
import { jsx } from 'theme-ui';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import ProductCard from '../components/product-card';

export const query = graphql`
  {
    allShopifyProduct(
      filter: { variants: { elemMatch: { availableForSale: { eq: true } } } }
    ) {
      nodes {
        id
        title
        slug
        productType
        description
        tags
        variants {
          title
          image {
            localFile {
              childImageSharp {
                fluid(
                  maxWidth: 1600
                  maxHeight: 900
                  fit: COVER
                  cropFocus: CENTER
                ) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
          }
          priceV2 {
            amount
            currencyCode
          }
          sku
        }
      }
    }
  }
`;

export default ({ data }) => (
  <Layout home>
    <div
      sx={{
        mx: 'auto',
        maxWidth: '90vw',
        display: 'grid',
        gridGap: '1rem',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      }}
    >
      {data.allShopifyProduct.nodes.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  </Layout>
);
