<template>
    <div class="wrapper blog-posts">
        <div class="page-header page-header-small rellax-header">
            <div class="page-header-image" :style="backgroundImageStyle"></div>
            <div class="content-center">
                <div class="row">
                    <div class="col-md-8 ml-auto mr-auto text-center">
                        <h2 class="title">
                            {{ categoryName }}
                        </h2>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-md-10 ml-auto mr-auto">
                    <h2 class="title">{{ categoryName }}</h2><br />
                    <card type="blog" plain v-for="post in blogposts" :key="post.url">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="card-image"><img class="img img-raised rounded" :src="post.ImageURL"
                                        :alt="post.Name" />
                                </div>
                            </div>
                            <div class="col-md-8">
                                <h3 class="card-title">
                                    <nuxt-link :to="post.FileURL">{{ post.Name }}</nuxt-link>
                                </h3>
                                <p class="card-description">
                                    {{ post.Name }}<nuxt-link :to="post.FileURL">
                                        Read
                                        More </nuxt-link>
                                </p>
                                <div class="author"><img v-lazy="post.AuthorURL" :alt="post.Author"
                                        class="avatar img-raised"><span>{{ post.Author }}</span></div>
                            </div>
                        </div>
                    </card>
                </div>
            </div>
        </div>
        <div class="main">
            <div class="container">
                <div class="section">
                    <h3 class="title text-center">You may also be interested in</h3>
                    <br />
                    <div class="row">
                        <div class="col-md-4" v-for="post in fetchPreviewBlogs" :key="post.FileURL">
                            <div class="card card-plain card-blog">
                                <div class="card-image">
                                    <nuxt-link :to="post.FileURL">
                                        <img class="img rounded img-raised" v-lazy="post.ImageURL" :alt="post.Name" />
                                    </nuxt-link>
                                </div>
                                <div class="card-body">
                                    <h6 class="category text-danger">
                                        <em class="now-ui-icons media-2_sound-wave"></em>{{
                                            post.Tags }}
                                    </h6>
                                    <h4 class="card-title">
                                        <nuxt-link :to="post.FileURL">{{ post.Name }}</nuxt-link>
                                    </h4>
                                    <p class="card-description">
                                        {{ post.Name }}
                                        <nuxt-link :to="post.FileURL">
                                            Read More
                                        </nuxt-link>
                                    </p>

                                    <div class="author">
                                        <img v-lazy="post.AuthorURL" :alt="post.Author" class="avatar img-raised"><span>{{
                                            post.Author }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Card, Button, FormGroupInput } from "@/components";
import initParallax from "@/utils/initParallax";
export default {
    name: "category",
    layout: "default",
    components: {
        Card,
        [Button.name]: Button,
        [FormGroupInput.name]: FormGroupInput,
    },
    data() {
        return {
            year: new Date().getFullYear(),
            imageURL: "/img/coding/bg-1.jpg",
            categoryName: "Coding",
            previewBlogs: [
                {
                    "pk": "learn.blitzbudget.com",
                    "sk": "content/devops/aws/cloudformation/mastering-infrastructure-deployment-with-aws-cloudformation-and-github-workflows/mastering-infrastructure-deployment-with-aws-cloudformation-and-github-workflows.json",
                    "Author": "Nagarjun Nagesh",
                    "Category": "devops/aws/cloudformation/mastering-infrastructure-deployment-with-aws-cloudformation-and-gitHub-workflows",
                    "creation_date": "2023-07-28T11:21:57Z",
                    "FileURL": "devops/aws/cloudformation/mastering-infrastructure-deployment-with-aws-cloudformation-and-github-workflows/mastering-infrastructure-deployment-with-aws-cloudformation-and-github-workflows",
                    "ImageURL": "/img/devops/bg-1.jpg",
                    "AuthorURL": "/img/authors/nagarjun-nagesh.jpg",
                    "Name": "Mastering Infrastructure Deployment with AWS CloudFormation and GitHub Workflows",
                    "Tags": "devops, aws, cloudformation, mastering-infrastructure-deployment-with-aws-cloudformation-and-gitHub-workflows",
                },
                {
                    "pk": "learn.blitzbudget.com",
                    "sk": "content/coding/backend/serverless/golang/golang-fundamentals/golang-fundamentals-a-comprehensive-guide-to-go-programming.json",
                    "Author": "Nagarjun Nagesh",
                    "Category": "coding/backend/serverless/golang/golang-fundamentals",
                    "creation_date": "2023-07-28T11:21:51Z",
                    "FileURL": "coding/backend/serverless/golang/golang-fundamentals/golang-fundamentals-a-comprehensive-guide-to-go-programming",
                    "ImageURL": "/img/devops/bg-3.jpg",
                    "AuthorURL": "/img/authors/nagarjun-nagesh.jpg",
                    "Name": "Golang Fundamentals: A Comprehensive Guide to Go Programming",
                    "Tags": "coding, backend, serverless, golang, golang-fundamentals"
                },
                {
                    "pk": "learn.blitzbudget.com",
                    "sk": "content/coding/backend/serverless/nodejs/nodejs-fundamanetals/nodejs-fundamentals-unleashing-the-power-of-nodejs-development.json",
                    "Author": "Nagarjun Nagesh",
                    "Category": "coding/backend/serverless/nodejs/nodejs-fundamanetals",
                    "creation_date": "2023-07-28T11:21:52Z",
                    "FileURL": "coding/backend/serverless/nodejs/nodejs-fundamanetals/nodejs-fundamentals-unleashing-the-power-of-nodejs-development",
                    "ImageURL": "/img/devops/bg-2.jpg",
                    "AuthorURL": "/img/authors/nagarjun-nagesh.jpg",
                    "Name": "Nodejs Fundamentals: Unleashing the Power of Nodejs Development",
                    "Tags": "coding, backend, serverless, nodejs, nodejs-fundamanetals"
                },
            ],
            blogposts: [
                {
                    "pk": "learn.blitzbudget.com",
                    "sk": "content/coding/frontend/javascript/mastering-vanilla-javascript-ensuring-cross-browser-compatibility/mastering-vanilla-javascript-ensuring-cross-browser-compatibility.json",
                    "Author": "Nagarjun Nagesh",
                    "Category": "coding/frontend/javascript/mastering-vanilla-javascript-ensuring-cross-browser-compatibility",
                    "creation_date": "2023-07-28T11:21:54Z",
                    "FileURL": "coding/frontend/javascript/mastering-vanilla-javascript-ensuring-cross-browser-compatibility/mastering-vanilla-javascript-ensuring-cross-browser-compatibility",
                    "Name": "Mastering Vanilla JavaScript: Ensuring Cross-Browser Compatibility",
                    "Tags": "coding, frontend, javascript, mastering-vanilla-javascript-ensuring-cross-browser-compatibility"
                },
                {
                    "pk": "learn.blitzbudget.com",
                    "sk": "content/devops/aws/cloudformation/mastering-infrastructure-deployment-with-aws-cloudformation-and-github-workflows/mastering-infrastructure-deployment-with-aws-cloudformation-and-github-workflows.json",
                    "Author": "Nagarjun Nagesh",
                    "Category": "devops/aws/cloudformation/mastering-infrastructure-deployment-with-aws-cloudformation-and-gitHub-workflows",
                    "creation_date": "2023-07-28T11:21:57Z",
                    "FileURL": "devops/aws/cloudformation/mastering-infrastructure-deployment-with-aws-cloudformation-and-github-workflows/mastering-infrastructure-deployment-with-aws-cloudformation-and-github-workflows",
                    "Name": "Mastering Infrastructure Deployment with AWS CloudFormation and GitHub Workflows",
                    "Tags": "devops, aws, cloudformation, mastering-infrastructure-deployment-with-aws-cloudformation-and-gitHub-workflows",
                },
                {
                    "pk": "learn.blitzbudget.com",
                    "sk": "content/devops/aws/cloudformation/mastering-infrastructure-deployment-with-aws-cloudformation-and-github-workflows/chapter-9-linking-the-api-domain-name-with-route-53.json",
                    "Author": "Nagarjun Nagesh",
                    "Category": "devops/aws/cloudformation/mastering-infrastructure-deployment-with-aws-cloudformation-and-gitHub-workflows",
                    "creation_date": "2023-07-28T11:21:57Z",
                    "FileURL": "devops/aws/cloudformation/mastering-infrastructure-deployment-with-aws-cloudformation-and-github-workflows/chapter-9-linking-the-api-domain-name-with-route-53",
                    "Name": "Chapter 9: Linking the API Domain Name with Route 53",
                    "Tags": "devops, aws, cloudformation, mastering-infrastructure-deployment-with-aws-cloudformation-and-gitHub-workflows"
                },
                {
                    "pk": "learn.blitzbudget.com",
                    "sk": "content/devops/aws/cloudformation/mastering-infrastructure-deployment-with-aws-cloudformation-and-github-workflows/chapter-8-linking-the-api-domain-name-with-an-http-certificate.json",
                    "Author": "Nagarjun Nagesh",
                    "Category": "devops/aws/cloudformation/mastering-infrastructure-deployment-with-aws-cloudformation-and-gitHub-workflows",
                    "creation_date": "2023-07-28T11:21:57Z",
                    "FileURL": "devops/aws/cloudformation/mastering-infrastructure-deployment-with-aws-cloudformation-and-github-workflows/chapter-8-linking-the-api-domain-name-with-an-http-certificate",
                    "Name": "Chapter 8: Linking the API Domain Name with an HTTP Certificate",
                    "Tags": "devops, aws, cloudformation, mastering-infrastructure-deployment-with-aws-cloudformation-and-gitHub-workflows"
                },
                {
                    "pk": "learn.blitzbudget.com",
                    "sk": "content/devops/aws/cloudformation/mastering-infrastructure-deployment-with-aws-cloudformation-and-github-workflows/chapter-7-generating-a-certificate-in-us-east-1-for-the-domain.json",
                    "Author": "Nagarjun Nagesh",
                    "Category": "devops/aws/cloudformation/mastering-infrastructure-deployment-with-aws-cloudformation-and-gitHub-workflows",
                    "creation_date": "2023-07-28T11:21:57Z",
                    "FileURL": "devops/aws/cloudformation/mastering-infrastructure-deployment-with-aws-cloudformation-and-github-workflows/chapter-7-generating-a-certificate-in-us-east-1-for-the-domain",
                    "Name": "Chapter 7: Generating a Certificate in us-east-1 for the Domain",
                    "Tags": "devops, aws, cloudformation, mastering-infrastructure-deployment-with-aws-cloudformation-and-gitHub-workflows"
                }
            ]
        };
    },
    async mounted() {
        initParallax();
        this.setHeaders();
        await this.fetchMarkdownContent();
        this.categoryName = this.fetchCategoryName();
    },
    computed: {
        backgroundImageStyle() {
            // Computed property to generate the background-image style
            return {
                'background-image': `url(${this.imageURL})`,
            };
        },
        fetchPreviewBlogs() {
            return this.previewBlogs;
        }
    },
    methods: {
        async fetchMarkdownContent() {
            const fetchIndexUrl = '/content/index.json';
            await this.$axios.get(fetchIndexUrl)
                .then((response) => {
                    this.blogposts = response.data;
                })
                .catch((error) => {
                    console.error('Error fetching content:', error);
                });

            this.extractKeywordAndConstructURLs();
        },
        extractKeywordAndConstructURLs() {
            let filteredPosts = [];
            let appendPreviewBlogs = [];
            let categoryName = this.fetchCategoryName().toLowerCase();
            this.blogposts.forEach((item) => {
                item.ImageURL = this.extractKeywordAndConstructURL(item)
                item.AuthorURL = this.fetchAuthorImageUrl(item)
                item.FileURL = this.formatSk(item.sk)

                if (item.Name.includes("Chapter ")) {
                    return
                } else if (item.Category.indexOf(categoryName) === -1) {
                    appendPreviewBlogs.push(item)
                    return
                }

                // Add Filtered Posts
                filteredPosts.push(item)
            });

            this.blogposts = filteredPosts;
            // Append Preview Blogs
            this.previewBlogs = appendPreviewBlogs
        },
        formatSk(sk) {
            // Remove "/content" and ".json" from the sk string
            return "/" + sk.replace(/^content\/|\.json$/g, '');
        },
        extractKeywordAndConstructURL(blogPost) {
            // Split the URL by slashes to get individual parts
            const parts = blogPost.Category.split("/");

            // Get the first part of the URL
            this.fetchedKeyword = parts[0];

            // Generate a random number between 1 and 125
            const random = Math.floor(Math.random() * 125) + 1;

            // Construct the new URL
            return `/img/${this.fetchedKeyword}/bg-${random}.jpg`;
        },
        fetchAuthorImageUrl(blogPost) {
            let authorSlug = "nagarjun-nagesh";
            if (blogPost.author) {
                authorSlug = this.blogPost.author
                    .toLowerCase()
                    .replace(/\s+/g, "-") // Replace spaces with hyphens
                    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except hyphens
                    .replace(/\-\-+/g, "-"); // Replace multiple consecutive hyphens with a single hyphen
            }

            return `/img/authors/${authorSlug}.jpg`
        },
        formattedTags() {
            // The original string
            const originalString = this.$route.fullPath;

            // Remove the leading slash and split the string into an array using "/"
            const tagArray = originalString.substring(1).split("/");

            // Exclude the first element ("category") and join the array elements with ", "
            const formattedString = tagArray.slice(1).join(", ")

            return formattedString;
        },
        extractCategoryImageURL() {
            // The original string
            const originalString = this.$route.fullPath;

            // Remove the leading slash and split the string into an array using "/"
            const tagArray = originalString.substring(1).split("/");

            // Get the first part of the URL
            this.fetchedKeyword = tagArray[1];

            // Generate a random number between 1 and 125
            const random = Math.floor(Math.random() * 125) + 1;

            // Construct the new URL
            return `/img/${this.fetchedKeyword}/bg-${random}.jpg`;
        },
        fetchCategoryName() {
            // The original string
            const originalString = this.$route.fullPath;
            // Remove the leading slash and split the string into an array using "/"
            const tagArray = originalString.substring(1).split("/");
            const categoryName = tagArray[1].charAt(0).toUpperCase() + tagArray[1].slice(1)

            // Get the first part of the URL
            return categoryName;
        },
        setHeaders() {
            // Generate dynamic meta tags based on the fetched data
            const canonicalUrl = process.env.BASE_URL + `/${this.$route.fullPath}`;
            const tags = this.formattedTags()
            const imageURL = this.extractCategoryImageURL();
            const categoryName = this.fetchCategoryName()

            // Set the meta tags dynamically on the client-side
            this.$nuxt.$options.head = () => ({
                title: categoryName || 'Learn BlitzBudget Category',
                meta: [
                    { hid: 'description', name: 'description', content: tags },
                    { hid: 'keywords', name: 'keywords', content: tags },
                    { name: 'author', content: 'Nagarjun Nagesh' },
                    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
                    { hid: 'og:title', property: 'og:title', content: categoryName },
                    { hid: 'og:description', property: 'og:description', content: tags },
                    { hid: 'og:image', property: 'og:image', content: imageURL },
                    { hid: 'og:url', property: 'og:url', content: canonicalUrl },
                    { name: 'twitter:card', content: 'summary_large_image' },
                    { name: 'twitter:title', content: categoryName },
                    { name: 'twitter:description', content: tags },
                    { name: 'twitter:image', content: imageURL },
                    { name: 'robots', content: 'index,follow' },
                    { 'http-equiv': 'expires', content: 'Fri, 01 Jan 2023 00:00:00 GMT' },
                    { 'http-equiv': 'content-language', content: 'en' }
                ],
                link: [
                    { rel: 'canonical', href: canonicalUrl }
                ],
            });
        },
    }
};
</script>
<style></style>
    