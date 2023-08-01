<template>
    <div class="wrapper blog-posts">
        <div class="page-header page-header-small rellax-header">
            <div class="page-header-image" style="background-image: url('img/bg44.jpg')"></div>
            <div class="content-center">
                <div class="row">
                    <div class="col-md-8 ml-auto mr-auto text-center">
                        <h2 class="title">
                            A Place to discover more about ourselves and learn to live a
                            meaningful life.
                        </h2>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-md-10 ml-auto mr-auto">
                    <h2 class="title">Psychology</h2><br />
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
                                <div class="author"><img v-lazy="'img/authors/nagarjun.jpg'" alt="..."
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
                        <div class="col-md-4">
                            <card type="blog" plain>
                                <img slot="image" class="img rounded img-raised"
                                    src="img/personal-finance/power-of-dreaming.jpg" alt="Dream" />
                                <h6 class="category text-info">Personal Finance</h6>
                                <h4 class="card-title">
                                    <nuxt-link to="/personal-finance/power-of-dreaming/">The Power of Dreaming</nuxt-link>
                                </h4>
                                <p class="card-description">
                                    It all starts with a dream to become successful in life. The
                                    dream has to be justified with a definiteness of purpose. The
                                    purpose then drives us to plan and to take action.
                                    <nuxt-link to="/personal-finance/power-of-dreaming/"> Read More </nuxt-link>
                                </p>
                                <div class="author">
                                    <img v-lazy="'img/authors/nagarjun.jpg'" alt="..." class="avatar img-raised" />
                                    <span>Nagarjun</span>
                                </div>
                            </card>
                        </div>
                        <div class="col-md-4">
                            <card type="blog" plain>
                                <img slot="image" class="img rounded img-raised"
                                    src="img/personal-finance/are-you-rich-if-you-own-a-bmw.jpg" alt="BMW" />
                                <h6 class="category text-success">Personal Finance</h6>
                                <h4 class="card-title">
                                    <nuxt-link to="/personal-finance/are-you-rich-if-you-own-a-bmw/">Are you Rich if you own
                                        a BMW?
                                    </nuxt-link>
                                </h4>
                                <p class="card-description">
                                    The majority of millionaires own their cars rather than lease.
                                    Approximately 1 in 4 hold the current years model but another
                                    25 % have a model that is a four-year-old model.
                                    <nuxt-link to="/personal-finance/are-you-rich-if-you-own-a-bmw/">
                                        Read More
                                    </nuxt-link>
                                </p>
                                <div class="author">
                                    <img v-lazy="'img/authors/nagarjun.jpg'" alt="..." class="avatar img-raised" />
                                    <span>Nagarjun</span>
                                </div>
                            </card>
                        </div>
                        <div class="col-md-4">
                            <div class="card card-plain card-blog">
                                <div class="card-image">
                                    <nuxt-link to="/psychology/the-truth-about-white-lies/">
                                        <img class="img rounded img-raised" src="img/psychology/bg18.jpg" alt="Lies" />
                                    </nuxt-link>
                                </div>
                                <div class="card-body">
                                    <h6 class="category text-danger">
                                        <em class="now-ui-icons media-2_sound-wave"></em> Psychology
                                    </h6>
                                    <h4 class="card-title">
                                        <nuxt-link to="/psychology/the-truth-about-white-lies/">The Truth about White
                                            Lies</nuxt-link>
                                    </h4>
                                    <p class="card-description">
                                        Once we establish ourselves as a person who would not shy
                                        away from saying white lies as long as we get what we
                                        want/prevent bad things from happening by telling the truth.
                                        <nuxt-link to="/psychology/the-truth-about-white-lies/">
                                            Read More
                                        </nuxt-link>
                                    </p>

                                    <div class="author">
                                        <img v-lazy="'img/authors/nagarjun.jpg'" alt="..." class="avatar img-raised" />
                                        <span>Nagarjun</span>
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
    name: "blog-posts",
    layout: "default",
    head: {
        title: 'Psychology',
    },
    components: {
        Card,
        [Button.name]: Button,
        [FormGroupInput.name]: FormGroupInput,
    },
    data() {
        return {
            year: new Date().getFullYear(),
            blogposts: [
                {
                    "pk": "learn.blitzbudget.com",
                    "sk": "content/devops/aws/cloudformation/mastering-infrastructure-deployment-with-aws-cloudformation-and-github-workflows/mastering-infrastructure-deployment-with-aws-cloudformation-and-github-workflows.json",
                    "Author": "Nagarjun Nagesh",
                    "Category": "devops/aws/cloudformation/mastering-infrastructure-deployment-with-aws-cloudformation-and-gitHub-workflows",
                    "creation_date": "2023-07-28T11:21:57Z",
                    "File": "",
                    "Name": "Mastering Infrastructure Deployment with AWS CloudFormation and GitHub Workflows",
                    "Tags": "devops, aws, cloudformation, mastering-infrastructure-deployment-with-aws-cloudformation-and-gitHub-workflows"
                },
                {
                    "pk": "learn.blitzbudget.com",
                    "sk": "content/devops/aws/cloudformation/mastering-infrastructure-deployment-with-aws-cloudformation-and-github-workflows/chapter-9-linking-the-api-domain-name-with-route-53.json",
                    "Author": "Nagarjun Nagesh",
                    "Category": "devops/aws/cloudformation/mastering-infrastructure-deployment-with-aws-cloudformation-and-gitHub-workflows",
                    "creation_date": "2023-07-28T11:21:57Z",
                    "File": "",
                    "Name": "Chapter 9: Linking the API Domain Name with Route 53",
                    "Tags": "devops, aws, cloudformation, mastering-infrastructure-deployment-with-aws-cloudformation-and-gitHub-workflows"
                },
                {
                    "pk": "learn.blitzbudget.com",
                    "sk": "content/devops/aws/cloudformation/mastering-infrastructure-deployment-with-aws-cloudformation-and-github-workflows/chapter-8-linking-the-api-domain-name-with-an-http-certificate.json",
                    "Author": "Nagarjun Nagesh",
                    "Category": "devops/aws/cloudformation/mastering-infrastructure-deployment-with-aws-cloudformation-and-gitHub-workflows",
                    "creation_date": "2023-07-28T11:21:57Z",
                    "File": "",
                    "Name": "Chapter 8: Linking the API Domain Name with an HTTP Certificate",
                    "Tags": "devops, aws, cloudformation, mastering-infrastructure-deployment-with-aws-cloudformation-and-gitHub-workflows"
                },
                {
                    "pk": "learn.blitzbudget.com",
                    "sk": "content/devops/aws/cloudformation/mastering-infrastructure-deployment-with-aws-cloudformation-and-github-workflows/chapter-7-generating-a-certificate-in-us-east-1-for-the-domain.json",
                    "Author": "Nagarjun Nagesh",
                    "Category": "devops/aws/cloudformation/mastering-infrastructure-deployment-with-aws-cloudformation-and-gitHub-workflows",
                    "creation_date": "2023-07-28T11:21:57Z",
                    "File": "",
                    "Name": "Chapter 7: Generating a Certificate in us-east-1 for the Domain",
                    "Tags": "devops, aws, cloudformation, mastering-infrastructure-deployment-with-aws-cloudformation-and-gitHub-workflows"
                }
            ]
        };
    },
    mounted() {
        initParallax();
        this.setHeaders();
    },
    methods: {
        async fetchMarkdownContent() {
            const fetchIndexUrl = '/content/index.json';
            await this.$axios.get(fetchIndexUrl)
                .then((response) => {
                    this.blogposts = response.data
                })
                .catch((error) => {
                    console.error('Error fetching content:', error);
                });

            this.extractKeywordAndConstructURLs();
        },
        extractKeywordAndConstructURLs() {
            this.blogposts.forEach((item) => {
                this.extractKeywordAndConstructURL(item)
                item.FileURL = this.formatSk(item.sk)
            });
        },
        formatSk(sk) {
            // Remove "/content" and ".json" from the sk string
            return sk.replace(/^content\/|\.json$/g, '');
        },
        extractKeywordAndConstructURL(blogPost) {
            // Split the URL by slashes to get individual parts
            const parts = blogPost.Category.split("/");

            // Get the first part of the URL
            this.fetchedKeyword = parts[0];

            // Generate a random number between 1 and 125
            const random = Math.floor(Math.random() * 125) + 1;

            // Construct the new URL
            blogPost.ImageURL = `img/${this.fetchedKeyword}/bg-${random}.jpg`;
        },
        formattedTags() {
            // The original string
            const originalString = this.$route.fullPath;

            // Remove the leading slash and split the string into an array using "/"
            const tagArray = originalString.substring(1).split("/");

            // Join the array elements with ", "
            const formattedString = tagArray.join(", ");

            return formattedString;
        },
        extractCategoryImageURL() {
            // The original string
            const originalString = this.$route.fullPath;

            // Remove the leading slash and split the string into an array using "/"
            const tagArray = originalString.substring(1).split("/");

            // Get the first part of the URL
            this.fetchedKeyword = tagArray[0];

            // Generate a random number between 1 and 125
            const random = Math.floor(Math.random() * 125) + 1;

            // Construct the new URL
            return `img/${this.fetchedKeyword}/bg-${random}.jpg`;
        },
        fetchCategoryName() {
            // The original string
            const originalString = this.$route.fullPath;

            // Remove the leading slash and split the string into an array using "/"
            const tagArray = originalString.substring(1).split("/");

            // Get the first part of the URL
            return tagArray[0];
        },
        setHeaders() {
            // Generate dynamic meta tags based on the fetched data
            const canonicalUrl = `https://learn.blitzbudget.com/${this.$route.fullPath}`;
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
    