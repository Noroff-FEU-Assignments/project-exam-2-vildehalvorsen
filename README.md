# Social Media App / Project Exam 2

The brief for the exam:
An existing Social Media company has approached you to create a brand new front end for their application. While they have a list of required features, the design and user experience has not been specified. Working with the official API documentation, plan, design and build a modern front end social media application.

## Description
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

#### Limitations
1. Only users with a `stud.noroff.no` email can register and log in.

2. On the profile list page, the profiles displayed are limited to 500 and doesn't include all registered profiles. The sort order is set to ascending, which makes only the 500 first profiles in an ascending order available for search. This is to limit the data being returned.

3. It is not possible to delete or remove comments and reactions.

## Installing

1. Clone the repo`

2. Get to the root directory:
```bash
cd hwu-app
```

3. Install dependencies:
```
npm install
```

## Getting started locally
This will run the app in development mode in your browser: http://localhost:3000
```bash
npm start
```

## Built with
- React (>16)
- Styled Components

## Resources
[Noroff API documentation](https://noroff-api-docs.netlify.app/)
[API Guide](https://noroff-api-docs.netlify.app/social-endpoints/authentication)
[API Documentation](https://nf-api.onrender.com/docs)

## Hosting Service
- Netlify

You can visit the app demo on this link:
https://hangwithus.netlify.app/

