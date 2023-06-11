# Project Exam 2

## Goal
To take the skills learned over the last two years and take on an extensive project where the finished product should reflect the candidate's general development capabilities, in addition to visual and technical skills.

## Brief
An existing Social Media company has approached you to create a brand new front end for their application. While they have a list of required features, the design and user experience has not been specified. Working with the official API documentation, plan, design and build a modern front end social media application.

## Getting started locally
To start the app locally, follow these steps:
1. Clone the repository from GitHub
2. In your code editor, open the terminal and run `cd hwu-app` to get to the correct directory.
3. Run `npm install` to install dependencies
4. Run `npm start`. This will run the app in development mode in your browser: http://localhost:3000

### Hosting Service
- Netlify

You can visit the app demo on this link:
https://hangwithus.netlify.app/

### Instructions
> All admin functionality is managed by an existing application. This project only covers the front-end application for the API.

1. You can register with a `stud.noroff.no` email address.
2. When successfully registered, you can log in with your email and chosen password to get access to the app content.
#### When logged in
3. You can update your avatar and banner on your Account Page
4. You can create posts
5. You can update and delete your own posts.
6. You an view a list of posts on the Dashboard Page.
7. You can view a single post by clicking on the post.
8. You can comment and react with an emoji on any post.
9. You can view a list of profiles on the Profiles List Page.
10. You can view a single profile by clicking on their avatar or name.
11. You can follow and unfollow any profile.
12. You can log out.

## Limitations
1. Only users with `stud.noroff.no` email can register and log in.

2. On the profile list page, the profiles displayed are limited to 500 and doesn't include all registered profiles. The sort order is set to ascending, which makes only the 500 first profiles in an ascending order available for search. This is to limit the data being returned.

3. It is not possible to delete or remove comments and reactions.

## API
The API for this project is found under Social EndPoints in the [Noroff API documentation](https://noroff-api-docs.netlify.app/).

### Resources
[API Guide](https://noroff-api-docs.netlify.app/social-endpoints/authentication)
[API Documentation](https://nf-api.onrender.com/docs)

### JavaScript Frameworks
- React (>16)

### CSS Frameworks
- Styled Components