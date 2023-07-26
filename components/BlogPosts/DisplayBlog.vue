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
                                    <span class="label label-success">{{ blogPost.tags }}</span>
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
                                            <nuxt-link to="#pablo">
                                                <img class="img img-raised" :src="fetchAuthorImageUrl" alt="author" />
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
                                        <button type="button" class="btn btn-default pull-right btn-round">
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
            <other-blogs :next="16" :previous="17"></other-blogs>
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
                author: null,
                category: null,
                content: null,
                create_audio: null,
                name: null,
                tags: null,
                audio_created: false,
                audioURL: null,
            },
            imageURL: null
        };
    },
    components: {
        OtherBlogs,
        Card,
    },
    mounted() {
        initParallax();
        this.fetchMarkdownContent();
    },
    computed: {
        backgroundImageStyle() {
            // Computed property to generate the background-image style
            return {
                'background-image': `url(${this.imageURL})`,
            };
        },
        fetchAuthorImageUrl() {
            let authorSlug;
            if (this.blogPost.author) {
                authorSlug = this.blogPost.author
                    .toLowerCase()
                    .replace(/\s+/g, "-") // Replace spaces with hyphens
                    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except hyphens
                    .replace(/\-\-+/g, "-"); // Replace multiple consecutive hyphens with a single hyphen
            }

            return `img/authors/${authorSlug}.jpg`
        },
    },
    methods: {
        fetchMarkdownContent() {
            const githubMarkdownURL = '/content' + this.$route.fullPath; // Replace with your GitHub Markdown file URL
            this.$axios.get(githubMarkdownURL)
                .then((response) => {
                    this.markdownContent = response.data.content;
                    this.blogPost = response.data
                    this.parseMarkdown();
                    this.extractKeywordAndConstructURL();
                })
                .catch((error) => {
                    console.error('Error fetching content:', error);
                });
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
    },
};
</script>
  