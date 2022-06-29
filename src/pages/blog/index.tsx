import * as React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../../components/layout";

type Props = {
  data: {
    allMdx: {
      nodes: {
        parent: {
          modifiedTime: string;
        };
        frontmatter: { title: string; date: string };
        id: string;
        body: string;
        slug: string;
      }[];
    };
  };
};

const BlogPage: React.FC<Props> = ({ data }) => {
  return (
    <Layout pageTitle="My Blog Posts">
      {data.allMdx.nodes.map((node) => (
        <article key={node.id}>
          <h2>
            <Link to={`/blog/${node.slug}`}>{node.frontmatter.title}</Link>
          </h2>
          <p>Posted: {node.frontmatter.date}</p>
          <p>Updated: {node.parent.modifiedTime}</p>
        </article>
      ))}
    </Layout>
  );
};

export const query = graphql`
  query {
    allMdx(sort: { fields: frontmatter___date, order: DESC }) {
      nodes {
        parent {
          ... on File {
            modifiedTime(formatString: "MMMM D, YYYY")
          }
        }
        frontmatter {
          date(formatString: "MMMM D, YYYY")
          title
        }
        id
        slug
      }
    }
  }
`;

export default BlogPage;
