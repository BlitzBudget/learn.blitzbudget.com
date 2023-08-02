<template>
  <div class="wrapper blog-posts">
    <div class="page-header page-header-small rellax-header">
      <div class="page-header-image" style="background-image: url('/img/coding/bg-15.jpg')"></div>
      <div class="content-center">
        <div class="row">
          <div class="col-md-8 ml-auto mr-auto text-center">
            <h2 class="title">
              A Place to learn about Coding, Devops and more.
            </h2>
          </div>
        </div>
      </div>
    </div>
    <div class="projects-4">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-6 px-0">
            <card type="background" class="card-fashion" style="background-image: url('/img/coding/bg-1.jpg')">
              <div class="card-title text-left">
                <h2>
                  <nuxt-link to="/category/coding/">
                    Coding
                  </nuxt-link>
                </h2>
              </div>
              <div class="card-footer text-left">
                <div class="stats">
                  <span>
                    <em class="now-ui-icons users_circle-08"></em>Nagarjun
                    Nagesh
                  </span>
                  <span>
                    <em class="now-ui-icons tech_watch-time"></em> September 01,
                    2023
                  </span>
                </div>
                <div class="stats-link pull-right">
                  <nuxt-link to="/category/coding/" class="footer-link">Coding</nuxt-link>
                </div>
              </div>
            </card>
          </div>
          <div class="col-md-3 px-0">
            <div class="card card-fashion">
              <div class="card-title">
                <h4>
                  <nuxt-link to="/category/devops">
                    Devops
                  </nuxt-link>
                </h4>
              </div>
              <div class="card-body">
                <div class="card-footer">
                  <div class="stats">
                    <span>
                      <em class="now-ui-icons users_circle-08"></em>Nagarjun
                      Nagesh
                    </span>
                    <span>
                      <em class="now-ui-icons tech_watch-time"></em> September
                      01, 2023
                    </span>
                  </div>
                  <div class="stats-link pull-right">
                    <nuxt-link to="/category/devops/">Devops</nuxt-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-3 px-0">
            <card type="background" class="card-fashion" style="
                background-image: url('/img/coding/bg-2.jpg');
              ">
            </card>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3 px-0">
            <card type="background" class="card-fashion" style="
                background-image: url('/img/coding/bg-5.jpg');
              ">
            </card>
          </div>
          <div class="col-md-3 px-0">
            <div class="card card-fashion arrow-left">
              <div class="card-title">
                <h4>
                  <nuxt-link to="/category/coding/frontend/">
                    Frontend Coding
                  </nuxt-link>
                </h4>
              </div>
              <div class="card-body">
                <div class="card-footer">
                  <div class="stats">
                    <span>
                      <em class="now-ui-icons users_circle-08"></em>Nagarjun
                      Nagesh
                    </span>
                    <span>
                      <em class="now-ui-icons tech_watch-time"></em> September
                      01, 2023
                    </span>
                  </div>
                  <div class="stats-link pull-right">
                    <nuxt-link to="/category/coding/frontend/">Frontend Coding</nuxt-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 px-0">
            <card type="background" class="card-fashion" style="
                background-image: url('/img/coding/bg-3.jpg');
              ">
              <div class="card-title text-left">
                <h2>
                  <nuxt-link to="/category/coding/backend/">Backend Coding</nuxt-link>
                </h2>
              </div>
              <div class="card-footer text-left">
                <div class="stats">
                  <span>
                    <em class="now-ui-icons users_circle-08"></em>Nagarjun
                    Nagesh
                  </span>
                  <span>
                    <em class="now-ui-icons tech_watch-time"></em> March 01,
                    2023
                  </span>
                </div>
                <div class="stats-link pull-right">
                  <nuxt-link to="/category/coding/backend/" class="footer-link">Backend Coding</nuxt-link>&sbquo;
                </div>
              </div>
            </card>
          </div>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="container">
        <div class="section">
          <h3 class="title text-center">You may also be interested in</h3>
          <br />
          <div class="row">
            <div class="col-md-4" v-for="post in previewBlogs" :key="post.FileURL">
              <div class="card card-plain card-blog">
                <div class="card-image">
                  <nuxt-link :to="post.FileURL">
                    <img class="img rounded img-raised" :src="post.ImageURL" :alt="post.Name" />
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
  name: "blog-posts",
  head: {
    title: 'BlitzBudget Learn for learning coding, personal finance and psychology among others',
  },
  layout: "default",
  components: {
    Card,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput,
  },
  data() {
    return {
      year: new Date().getFullYear(),
      blogposts: [],
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
    };
  },
  async mounted() {
    initParallax();
    await this.fetchIndex();
  },
  methods: {
    async fetchIndex() {
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
      this.blogposts.forEach((item) => {
        item.ImageURL = this.extractKeywordAndConstructURL(item)
        item.AuthorURL = this.fetchAuthorImageUrl(item)
        item.FileURL = this.formatSk(item.sk)

        if (item.Name.includes("Chapter ")) {
          return
        }
        // Add Filtered Posts
        filteredPosts.push(item)
      });

      // Append Preview Blogs
      this.previewBlogs = filteredPosts
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
    setHeaders() {
      // Generate dynamic meta tags based on the fetched data
      const canonicalUrl = process.env.BASE_URL + `/`;
      const description = "Learn programming, personal finance, psychology and much more";
      const imageURL = "/img/psychology/bg-1.jpg";
      const tags = "coding, devops, frontend, personal finance";

      // Set the meta tags dynamically on the client-side
      this.$nuxt.$options.head = () => ({
        title: categoryName || 'Learn BlitzBudget',
        meta: [
          { hid: 'description', name: 'description', content: description },
          { hid: 'keywords', name: 'keywords', content: tags },
          { name: 'author', content: 'Nagarjun Nagesh' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
          { hid: 'og:title', property: 'og:title', content: "Learn BlitzBudget" },
          { hid: 'og:description', property: 'og:description', content: description },
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
