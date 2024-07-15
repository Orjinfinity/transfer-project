const GenericPage = ({ pageProps }) => {
    return (
        <div>
        <h1>{pageProps.page.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: pageProps.page.content }} />
        </div>
    );
}

export async function getServerSideProps(context) {
    const { slug } = context.params;
    // const page = await fetchPage(slug);

    return {
        props: {
            page: {
                title: "Test",
                content: "<p>Test content</p>",
            },
            slug,
        },
    };
}

export default GenericPage;