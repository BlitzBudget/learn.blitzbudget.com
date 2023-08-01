<template>
    <div class="container">
        <div class="col-md-12">
            <h2 class="title text-center">Similar Stories</h2>
            <br />
            <div class="blogs-1" id="blogs-1">
                <div class="row">
                    <div class="col-md-10 ml-auto mr-auto">
                        <card type="blog" plain>
                            <template slot="raw-content">
                                <div class="row">
                                    <div class="col-md-5">
                                        <div class="card-image">
                                            <img class="img img-raised rounded" :src="nextImageURL" :alt="nextBlog.Name" />
                                        </div>
                                    </div>
                                    <div class="col-md-7">
                                        <h6 class="category text-info">{{ nextBlog.Tags }}</h6>
                                        <h3 class="card-title">
                                            <nuxt-link :to="nextBlog.FileURL">{{ nextBlog.Name }}
                                            </nuxt-link>
                                        </h3>
                                        <p class="card-description">
                                            {{ nextBlog.Name }}....
                                        </p>
                                        <p class="author">
                                            by
                                            <strong>{{ nextBlog.Author }}</strong> , {{ nextBlog.creation_date }}
                                        </p>
                                    </div>
                                </div>
                            </template>
                        </card>
                        <card type="blog" plain>
                            <div class="row">
                                <div class="col-md-7">
                                    <h6 class="category text-danger">
                                        <em class="now-ui-icons now-ui-icons media-2_sound-wave"></em>
                                        {{ previousBlog.Tags }}
                                    </h6>
                                    <h3 class="card-title">
                                        <nuxt-link :to="previousBlog.FileURL">{{ previousBlog.Name }}
                                        </nuxt-link>
                                    </h3>
                                    <p class="card-description">
                                        {{ previousBlog.Name }}.....
                                    </p>
                                    <p class="author">
                                        by
                                        <strong>{{ nextBlog.Author }}</strong> , {{ nextBlog.creation_date }}
                                    </p>
                                </div>
                                <div class="col-md-5">
                                    <div class="card-image">
                                        <img class="img img-raised rounded" :src="previousImageURL"
                                            :alt="previousBlog.Name" />
                                    </div>
                                </div>
                            </div>
                        </card>
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
                }],
            nextBlog: {
                pk: "learn.blitzbudget.com",
                sk: "content/coding/backend/serverless/golang/golang-fundamentals/chapter-1-introduction-to-golang.json",
                Author: "Nagarjun Nagesh",
                FileURL: "/coding/backend/serverless/golang/golang-fundamentals/chapter-1-introduction-to-golang",
                Category: "coding/backend/serverless/golang/golang-fundamentals",
                creation_date: "2023-07-28T11:21:51Z",
                Name: "Chapter 1: Introduction to Golang",
                Tags: "coding, backend, serverless, golang, golang-fundamentals"
            },
            previousBlog: {
                pk: "learn.blitzbudget.com",
                sk: "content/coding/backend/serverless/golang/golang-fundamentals/chapter-10-goroutine-scheduling-and-context.json",
                Author: "Nagarjun Nagesh",
                FileURL: "/coding/backend/serverless/golang/golang-fundamentals/chapter-10-goroutine-scheduling-and-context",
                Category: "coding/backend/serverless/golang/golang-fundamentals",
                creation_date: "2023-07-28T11:21:51Z",
                Name: "Chapter 10: Goroutine Scheduling and Context",
                Tags: "coding, backend, serverless, golang, golang-fundamentals"
            },
            nextImageURL: "/img/coding/bg-1.jpg",
            previousImageURL: "/img/coding/bg-2.jpg"
        };
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

            this.fetchRelatedBlogs();
            this.nextImageURL = this.extractKeywordAndConstructURL(this.nextBlog);
            this.previousImageURL = this.extractKeywordAndConstructURL(this.previousBlog);
            await this.fetchBlogContentForDescription(this.nextBlog.sk)
            await this.fetchBlogContentForDescription(this.previousBlog.sk)
        },
        async fetchBlogContentForDescription(blogURL) {
            await this.$axios.get(blogURL)
                .then((response) => {
                    console.log(response)
                })
                .catch((error) => {
                    console.error('Error fetching content:', error);
                });
        },
        fetchRelatedBlogs() {
            const url = this.removeStartingSlash(this.$route.fullPath)
            const filteredList = this.blogposts.filter(item => {
                let category = item.Category
                item.FileURL = this.formatSk(item.sk)
                return url.indexOf(category)
            });
            // Check if filteredList has at least two items
            if (filteredList.length >= 1) {
                // Assign the first item in filteredList to the selectedItem variable
                this.nextBlog = filteredList[0];
            }
            if (filteredList.length >= 2) {
                // assign the previous item 
                this.previousBlog = filteredList[1];
            }
        },
        extractKeywordAndConstructURL(blogPost) {
            // Split the URL by slashes to get individual parts
            const parts = blogPost.Category.split("/");

            // Get the first part of the URL
            this.fetchedKeyword = parts[0];

            // Generate a random number between 1 and 125
            const random = Math.floor(Math.random() * 125) + 1;

            // Construct the new URL
            return `img/${this.fetchedKeyword}/bg-${random}.jpg`;
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
        formatSk(sk) {
            // Remove "/content" and ".json" from the sk string
            return sk.replace(/^content\/|\.json$/g, '');
        },
        removeStartingSlash(url) {
            // Remove the trailing slash from the URL
            return url.replace(/^\/(.*)/, '$1')
        }
    },
    mounted() {
        initParallax();
        this.fetchMarkdownContent();
    },
};
</script>
<style></style>
