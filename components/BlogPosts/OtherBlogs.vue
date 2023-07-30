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
                                            <img class="img img-raised rounded" :src="nextImageURL" :alt="nextBlog.name" />
                                        </div>
                                    </div>
                                    <div class="col-md-7">
                                        <h6 class="category text-info">{{ nextBlog.tags }}</h6>
                                        <h3 class="card-title">
                                            <nuxt-link :to="nextBlog.FileURL">{{ nextBlog.name }}
                                            </nuxt-link>
                                        </h3>
                                        <p class="card-description">
                                            {{ nextBlog.name }}....
                                        </p>
                                        <p class="author">
                                            by
                                            <strong>{{ nextBlog.author }}</strong> , {{ nextBlog.creation_date }}
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
                                        {{ previousBlog.tags }}
                                    </h6>
                                    <h3 class="card-title">
                                        <nuxt-link :to="previousBlog.FileURL">{{ previousBlog.name }}
                                        </nuxt-link>
                                    </h3>
                                    <p class="card-description">
                                        {{ previousBlog.name }}.....
                                    </p>
                                    <p class="author">
                                        by
                                        <strong>{{ nextBlog.author }}</strong> , {{ nextBlog.creation_date }}
                                    </p>
                                </div>
                                <div class="col-md-5">
                                    <div class="card-image">
                                        <img class="img img-raised rounded" :src="previousImageURL"
                                            :alt="previousBlog.name" />
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
            blogposts: null,
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
            this.$axios.get(fetchIndexUrl)
                .then((response) => {
                    this.blogposts = response.data
                    this.fetchRelatedBlogs();
                    this.nextImageURL = this.extractKeywordAndConstructURL(this.nextBlog);
                    this.previousImageURL = this.extractKeywordAndConstructURL(this.previousBlog);
                })
                .catch((error) => {
                    console.error('Error fetching content:', error);
                });
        },
        fetchRelatedBlogs() {
            const url = this.$route.fullPath
            // Extract sk values and create a list of sk elements
            const baseUrl = url.substring(0, url.lastIndexOf("/"));
            const reducedList = this.blogposts.map(item => {
                let fileURL = this.formatSk(item.sk)
                if (item.Category.startsWith(baseUrl) && fileURL !== this.removeTrailingSlash(url)) {
                    item.FileURL = fileURL;
                    return item;
                }
            });
            // Check if reducedList has at least two items
            if (reducedList.length >= 1) {
                // Assign the first item in reducedList to the selectedItem variable
                this.nextBlog = reducedList[0];
            }
            if (reducedList.length >= 2) {
                // assign the previous item 
                this.previousBlog = reducedList[1];
            }
        },
        extractKeywordAndConstructURL(blogPost) {
            // Split the URL by slashes to get individual parts
            const parts = blogPost.category.split("/");

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
        formatSk(sk) {
            // Remove "/content" and ".json" from the sk string
            return sk.replace(/^\/content|\.json$/g, '');
        },
        removeTrailingSlash(url) {
            // Remove the trailing slash from the URL
            return url.replace(/\/$/, '');
        }
    },
    mounted() {
        initParallax();
        this.fetchMarkdownContent();
    },
};
</script>
<style></style>
