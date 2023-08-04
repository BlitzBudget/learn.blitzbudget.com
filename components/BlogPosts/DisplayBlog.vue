<!-- components/MarkdownContent.vue -->
<template>
    <div class="wrapper blog-post">
        <div class="page-header page-header-small rellax-header">
            <div class="page-header-image" :style="backgroundImageStyle">
            </div>
            <div class="content-center">
                <div class="row">
                    <div class="col-md-8 ml-auto mr-auto text-center">
                        <h2 class="title">{{ blogPost.name }}</h2>
                    </div>
                </div>
            </div>
        </div>
        <div class="section">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="button-container">
                            <nuxt-link to="#article" class="btn btn-success btn-round btn-lg">
                                <em class="now-ui-icons text_align-left"></em> Read Article
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
            <div class="section">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="button-container">
                                <audio v-if="blogPost.audio_created" controls color="primary">
                                    <source :src="blogPost.audioURL" type="audio/mpeg">
                                    Your browser does not support the audio element.
                                </audio>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="section" id="article">
                <div class="container">
                    <div class="row">
                        <div class="col-md-8 ml-auto mr-auto">
                            <div v-html="parsedMarkdown"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="section section-blog-info">
            <div class="container">
                <div class="row">
                    <div class="col-md-8 ml-auto mr-auto">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="blog-tags">
                                    Tags:
                                    <span class="label label-success" v-for="post in fetchTagsAndURL"
                                        :key="post.tag"><nuxt-link :to="post.url">#{{
                                            post.tag
                                        }} </nuxt-link></span>
                                </div>
                            </div>
                            <div class="col-md-6"></div>
                        </div>
                        <hr />
                        <card type="profile" plain>
                            <template slot="raw-content">
                                <div class="row">
                                    <div class="col-md-2">
                                        <div class="card-avatar">
                                            <nuxt-link to="/category/coding/">
                                                <img class="img img-raised" v-lazy="fetchAuthorImageUrl" alt="author" />
                                            </nuxt-link>
                                            <div class="ripple-container"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-8">
                                        <h4 class="card-title">{{ blogPost.author }}</h4>
                                        <p class="description">
                                            Discover the fascinating world of technology and coding with our engaging blog.
                                            Stay updated with the latest trends, insightful tutorials, and practical tips to
                                            level up your coding skills. Explore the world of innovation and join us on a
                                            journey of learning and discovery.
                                        </p>
                                    </div>
                                    <div class="col-md-2">
                                        <button type="button" class="btn btn-default pull-right btn-round" disabled>
                                            Follow
                                        </button>
                                    </div>
                                </div>
                            </template>
                        </card>
                    </div>
                </div>
            </div>
        </div>
        <div class="section">
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
                                            <img v-lazy="post.AuthorURL" :alt="post.Author"
                                                class="avatar img-raised"><span>{{
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
    </div>
</template>
  
<script>
import MarkdownIt from 'markdown-it';
import OtherBlogs from "@/components/BlogPosts/OtherBlogs.vue";
import {
    Card,
} from "@/components";
import initParallax from "@/utils/initParallax";

export default {
    data() {
        return {
            markdownContent: '',
            parsedMarkdown: '',
            blogPost: {
                author: "Nagarjun Nagesh",
                category: "devops/aws/cloudformation/mastering-infrastructure-deployment-with-aws-cloudformation-and-gitHub-workflows",
                content: "# Chapter 9: Linking the API Domain Name with Route 53 \n In this chapter, we'll use AWS CloudFormation to create an API Gateway and an API Domain Name together. Then, we'll link the custom domain name \"api.example.com\" with the API Gateway using Amazon Route 53.## Creating a CloudFormation Template for API Gateway and API Domain NameLet's create a CloudFormation template to set up the API Gateway and API Domain Name.```yamlAWSTemplateFormatVersion: '2010-09-09'Description: 'CloudFormation Template for API Gateway and API Domain Name'Parameters: HostedZoneId: Type: String    Description: 'Route 53 Hosted Zone ID for the domain'    Default: 'your_hosted_zone_id'Resources: MyApiGateway: Type: AWS:: ApiGateway:: RestApi    Properties: Name: MyAPIGateway  MyDomainName: Type: AWS:: ApiGateway:: DomainName    Properties: DomainName: api.example.com      CertificateArn: arn: aws: acm: us- east - 1: 123456789012: certificate / abcdefg - 1234 - 5678 - 90ab- cdef12345678  MyBasePathMapping: Type: AWS:: ApiGateway::BasePathMapping    Properties: DomainName: !Ref MyDomainName      RestApiId: !Ref MyApiGateway      BasePath: ''  MyDomainRecordSet: Type: AWS:: Route53::RecordSet    Properties: HostedZoneId: !Ref HostedZoneId      Name: api.example.com.Type: A      AliasTarget: HostedZoneId: !GetAtt MyDomainName.RegionalHostedZoneId        DNSName: !GetAtt MyDomainName.RegionalDomainName```In this template:- `AWSTemplateFormatVersion` and `Description` provide the version and description of the CloudFormation template, respectively.- `Parameters` section defines the input parameters for the template. We create a parameter named \"HostedZoneId, \" which represents the Route 53 hosted zone ID for the domain. You can either provide this ID during stack creation or use the default value and update it later.- `Resources` section defines the resources to be created. We create an API Gateway resource named \"MyApiGateway\" and an API Gateway domain name resource named \"MyDomainName.\" We associate the domain name with the SSL/TLS certificate using the \"CertificateArn\" property.- `Type: AWS:: ApiGateway:: RestApi` specifies the resource type for the API Gateway.- `Properties` section contains the configuration for the API Gateway. We set the API Gateway name as \"MyAPIGateway.\"- We then create a `MyBasePathMapping` resource of type `AWS:: ApiGateway:: BasePathMapping`. This resource maps the custom domain to the root path of the API Gateway, so requests to \"api.example.com\" will be directed to the API Gateway.- `DomainName: !Ref MyDomainName` references the custom domain name resource we created earlier.- `RestApiId: !Ref MyApiGateway` references the API Gateway resource.- `BasePath: ''` sets the base path mapping to the root path.- Finally, we create a Route 53 record set named \"MyDomainRecordSet\" that points the custom domain \"api.example.com\" to the API Gateway endpoint.## Deploying the API Gateway and API Domain NameTo create the API Gateway and link the custom domain name \"api.example.com\" with the API Gateway using the CloudFormation template, follow these steps:1. Save the template to a file (e.g., `api - gateway - and - domain - template.yaml`).2. Use the AWS CLI to create the CloudFormation stack:```bashaws cloudformation create - stack--stack - name MyAPIGatewayStack--template - body file://api-gateway-and-domain-template.yaml --parameter ParameterKey=HostedZoneId,ParameterValue=your_hosted_zone_id```Replace `your_hosted_zone_id` with the actual Route 53 hosted zone ID for your domain.This command creates a new CloudFormation stack named \"MyAPIGatewayStack\" using the \"api - gateway - and - domain - template.yaml\" template and provides the `HostedZoneId` parameter.## ConclusionIn this chapter, we successfully created an API Gateway and an API Domain Name using AWS CloudFormation. We also linked the custom domain name \"api.example.com\" with the API Gateway using Amazon Route 53, making our API accessible through the custom domain with secure HTTPS communication.In the next chapters, we'll explore additional security measures, such as implementing Web Application Firewall (WAF) rules and securing the API using AWS Identity and Access Management (IAM) policies. We'll also deploy a Lambda function and configure it to work with the API Gateway.",
                create_audio: null,
                name: "Chapter 9: Linking the API Domain Name with Route 53",
                tags: "devops, aws, cloudformation, mastering-infrastructure-deployment-with-aws-cloudformation-and-gitHub-workflows",
                audio_created: false,
                audioURL: null,
            },
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
            imageURL: "/img/coding/bg-1.jpg",
            categoryURL: "/category/coding/",
        };
    },
    components: {
        OtherBlogs,
        Card,
    },
    async mounted() {
        initParallax();
        await this.fetchMarkdownContent();
        this.setHeaders();
        this.categoryURL = "/category/" + this.fetchCategoryName();
    },
    computed: {
        backgroundImageStyle() {
            // Computed property to generate the background-image style
            return {
                'background-image': `url(${this.imageURL})`,
            };
        },
        fetchAuthorImageUrl() {
            let authorSlug = "nagarjun-nagesh";
            if (this.blogPost.author) {
                authorSlug = this.blogPost.author
                    .toLowerCase()
                    .replace(/\s+/g, "-") // Replace spaces with hyphens
                    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except hyphens
                    .replace(/\-\-+/g, "-"); // Replace multiple consecutive hyphens with a single hyphen
            }

            return `/img/authors/${authorSlug}.jpg`
        },
        fetchTagsAndURL() {
            console.log(this.blogPost.tags)
            return this.createTagObjectArray(this.blogPost.tags);
        },
        fetchPreviewBlogs() {
            return this.previewBlogs;
        }
    },
    methods: {
        fetchCategoryName() {
            // The original string
            const originalString = this.$route.fullPath;
            // Remove the leading slash and split the string into an array using "/"
            const tagArray = originalString.substring(1).split("/");
            const categoryName = tagArray[0].toLowerCase();

            // Get the first part of the URL
            return categoryName;
        },
        setHeaders() {
            // Generate dynamic meta tags based on the fetched data
            const canonicalUrl = `https://learn.blitzbudget.com/${this.$route.fullPath}`;
            const description = this.fetchDescriptionFromContent();
            // Set the meta tags dynamically on the client-side
            this.$nuxt.$options.head = () => ({
                title: this.blogPost.name || 'Learn BlitzBudget',
                meta: [
                    { hid: 'description', name: 'description', content: description },
                    { hid: 'keywords', name: 'keywords', content: this.blogPost.tags },
                    { name: 'author', content: this.blogPost.author },
                    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
                    { hid: 'og:title', property: 'og:title', content: this.blogPost.name },
                    { hid: 'og:description', property: 'og:description', content: description },
                    { hid: 'og:image', property: 'og:image', content: this.imageURL },
                    { hid: 'og:url', property: 'og:url', content: canonicalUrl },
                    { name: 'twitter:card', content: 'summary_large_image' },
                    { name: 'twitter:title', content: this.blogPost.name },
                    { name: 'twitter:description', content: description },
                    { name: 'twitter:image', content: this.imageURL },
                    { name: 'robots', content: 'index,follow' },
                    { 'http-equiv': 'expires', content: 'Fri, 01 Jan 2023 00:00:00 GMT' },
                    { 'http-equiv': 'content-language', content: 'en' }
                ],
                link: [
                    { rel: 'canonical', href: canonicalUrl }
                ],
            });
        },
        async fetchMarkdownContent() {
            const githubMarkdownURL = '/content' + this.$route.fullPath + '.json';
            await this.$axios.get(githubMarkdownURL)
                .then((response) => {
                    this.blogPost = response.data
                })
                .catch((error) => {
                    console.error('Error fetching content:', error);
                });

            this.markdownContent = this.blogPost.content;
            this.parseMarkdown();
            this.extractKeywordAndConstructURL();
        },
        parseMarkdown() {
            const md = new MarkdownIt();
            this.parsedMarkdown = md.render(this.markdownContent);
        },
        extractKeywordAndConstructURL() {
            // Split the URL by slashes to get individual parts
            const parts = this.blogPost.category.split("/");

            // Get the first part of the URL
            this.fetchedKeyword = parts[0];

            // Generate a random number between 1 and 125
            const random = Math.floor(Math.random() * 125) + 1;

            // Construct the new URL
            this.imageURL = `img/${this.fetchedKeyword}/bg-${random}.jpg`;
        },
        fetchDescriptionFromContent() {
            // Assuming this.blogPost.content contains the content string
            const content = this.blogPost.content;

            // Regular expression pattern to match sentences
            const sentencePattern = /[^.!?]*[.!?]/;

            let firstSentence = '';
            // Extract the first sentence using the pattern
            if (content) {
                firstSentence = content.match(sentencePattern)[0].trim();
            }

            console.log(firstSentence); // Output the first sentence of the content
            return firstSentence
        },
        createTagObjectArray(tags) {
            const tagArray = tags?.split(', ');

            let url = '/category';
            const tagObjectArray = tagArray.map((tag) => {
                url += `/${tag}`;
                return {
                    tag,
                    url,
                };
            });

            // Remove the last element
            tagObjectArray.pop();
            return tagObjectArray;
        }
    },
    async fetchIndexJSON() {
        const fetchIndexUrl = '/content/index.json';
        await this.$axios.get(fetchIndexUrl)
            .then((response) => {
                this.previewBlogs = response.data;
            })
            .catch((error) => {
                console.error('Error fetching content:', error);
            });

        this.extractKeywordAndConstructURLs();
    },
    extractKeywordAndConstructURLs() {
        let appendPreviewBlogs = [];
        let categoryName = this.fetchCategoryName().toLowerCase();
        this.blogposts.forEach((item) => {
            item.ImageURL = this.extractKeywordAndConstructURL(item)
            item.AuthorURL = this.fetchAuthorImageUrl(item)
            item.FileURL = this.formatSk(item.sk)

            if (item.Name.includes("Chapter ")) {
                return
            } else if (item.Category.indexOf(categoryName) !== -1) {
                appendPreviewBlogs.push(item)
                return
            }
        });

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
    }
};
</script>