import Container from '@/components/Container';
import LatestPosts from '@/components/LatestPosts';
import axios, { baseURL } from '@/lib/axiosConfig';



export default function Categories({ tag, posts }) {
  return (
    <Container
      title={`category/${tag} – Girish Chaudhari`}
      description="Thoughts on the software industry, programming, tech, videography, music, and my personal life."
    >
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          /category/
          {/* <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"> */}
          {tag}
          {/* </span> */}
        </h1>
        <p className="mb-12">
          Here you can find articles about everything {tag}.
        </p>
        <h2 className="mb-4">Latest articles</h2>
        <LatestPosts posts={posts} />
      </div>
    </Container>
  );
}

export async function getStaticPaths() {
  const resp = await fetch(`${baseURL}/category/slugs`, {
    method: `GET`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
  // console.log('base url =>', `${baseURL}/posts/slugs`)
  let res = await resp.json();

  let { data } = res;

  const paths = data.tags.map((tag: string) => {
    return { params: { slug: tag } };
  });

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params, preview = false }) {
//   let res = await axios.get(`/category?tag=${params.slug}`);
const resp = await fetch(`${baseURL}/category?tag=${params.slug}`, {
    method: `GET`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
  // console.log('base url =>', `${baseURL}/posts/slugs`)
  let res = await resp.json();


  let { data } = res;

  data.map((obj: any) => {
    const options: any = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    const createdAt = new Date(obj.createdAt).toLocaleDateString([], options);

    obj.createdDate = createdAt;

    return obj;
  });

  console.log('data', data);

  return {
    props: {
      tag: params.slug,
      posts: data
    }
  };
}