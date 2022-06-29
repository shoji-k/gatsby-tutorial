import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/layout";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

type Props = {
  data: {
    mdx: {
      frontmatter: {
        title: string;
        date: string;
        hero_image: any;
        hero_image_alt: string;
      };
      body: string;
    };
  };
};

const BlogPost: React.FC<Props> = ({ data }) => {
  // const image = getImage(data.mdx.frontmatter.hero_image);
  const image = data.mdx.frontmatter.hero_image;

  return (
    <Layout pageTitle={data.mdx.frontmatter.title}>
      <p>Posted: {data.mdx.frontmatter.date}</p>
      <GatsbyImage image={image} alt={data.mdx.frontmatter.hero_image_alt} />
      <MDXRenderer>{data.mdx.body}</MDXRenderer>
    </Layout>
  );
};

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        hero_image_alt
        hero_image_credit_link
        hero_image_credit_text
        hero_image
      }
    }
  }
`;

export default BlogPost;
