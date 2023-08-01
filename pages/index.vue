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
          "sk": "content/devops/aws/cloudformation/mastering-infrastructure-deployment-with-aws-cloudformation-and-github-workflows/chapter-9-linking-the-api-domain-name-with-route-53.json",
          "Author": "Nagarjun Nagesh",
          "Category": "devops/aws/cloudformation/mastering-infrastructure-deployment-with-aws-cloudformation-and-gitHub-workflows",
          "creation_date": "2023-07-28T11:21:57Z",
          "FileURL": "devops/aws/cloudformation/mastering-infrastructure-deployment-with-aws-cloudformation-and-github-workflows/chapter-9-linking-the-api-domain-name-with-route-53",
          "ImageURL": "/img/devops/bg-2.jpg",
          "AuthorURL": "/img/authors/nagarjun-nagesh.jpg",
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
          "ImageURL": "/img/devops/bg-3.jpg",
          "AuthorURL": "/img/authors/nagarjun-nagesh.jpg",
          "Name": "Chapter 8: Linking the API Domain Name with an HTTP Certificate",
          "Tags": "devops, aws, cloudformation, mastering-infrastructure-deployment-with-aws-cloudformation-and-gitHub-workflows"
        },
      ],
    };
  },
  mounted() {
    initParallax();
  },
};
</script>
<style></style>
