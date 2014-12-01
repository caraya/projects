projectApp = angular.module('projectList', []);

projectApp.factory('projectListHelper', function($rootScope) {
    var buildIndex = function(source, property) {
        var tempArray = [];

        for(var i = 0, len = source.length; i < len; ++i) {
            tempArray[source[i][property]] = source[i];
        }

        return tempArray;
    };

    return {
        buildIndex: buildIndex
    };
});
projectApp.controller('projectListCtrl', function ($scope) {
  $scope.appTitle = 'Portfolio Project List';
  $scope.appAuthor = 'Carlos Araya';

  var initialData = [{
      name: 'New Project',
      description: 'Test Project'
    }];
  
  $scope.createProject = function(){
    $scope.projects.push(initialData);
  };
  
  
  $scope.projects = [ {
  "description" : "Creating a the web front end for a web application using Web Compontents and Google Paper components. Learn How to use components and how to integrate Paper’s material look ",
  "name" : "Material Component Experiment",
  "notes" : "",
  "stage" : "Early Research and code",
  "type" : "Code",
  "url" : {
    "code" : "https://github.com/caraya/polymer-playground",
    "other" : "",
    "writeup" : ""
  }
}, {
  "description" : "Creating a set of D3 web components both using Polymer and standard web components. ",
  "name" : "D3 web components",
  "notes" : "Analyze advantages and disadvantages of each approach. Standard web components are only fully supported in Chrome. Polymer / X-tags is polyfills and syntactic sugar but it works with all modern browsers\n",
  "stage" : "Early Research and code",
  "type" : "Code / Writeup",
  "url" : {
    "code" : "",
    "other" : "",
    "writeup" : ""
  }
}, {
  "description" : "Creating a set of D3 Angular directives to test my skill and the technology. Biggest question is how do you nest directives and how do you make them work",
  "name" : "Angular directives for D3",
  "notes" : "",
  "stage" : "Early Research and code",
  "type" : "Code / Writeup",
  "url" : {
    "code" : "",
    "other" : "",
    "writeup" : ""
  }
}, {
  "description" : "There is a project out that provides material design directives for Angular. What would it take to use them to create the UI for an app?",
  "name" : "Material Design in Angular directives",
  "notes" : "There is a material directive that you can use to build projects in Angular. How well does it work?",
  "stage" : "Early Research and code",
  "type" : "Code / Writeup",
  "url" : {
    "code" : "",
    "other" : "",
    "writeup" : ""
  }
}, {
  "description" : "Create an Angular project thatt will display my project list from a JSON file",
  "name" : "Project list in Angular",
  "notes" : "You're looking at the first revision. Further work in inserting new entries and integrating with the MEAN stack ",
  "stage" : "Early Research and code",
  "type" : "Code / Weiteup",
  "url" : {
    "code" : "https://github.com/caraya/project-list-angular",
    "other" : "http://labs.rivendellweb.net/angular/project-list-angular/",
    "writeup" : ""
  }
}, {
  "description" : "One of the features I like most about ePub 3 is the synchronized books (read aloud) what does it take to create the SMIL file and the content to synchronize with the book? How does it change the way we build ePub content",
  "name" : "Synchronized audio books",
  "notes" : "",
  "stage" : "Early Research and code",
  "type" : "Code / Writeup",
  "url" : {
    "code" : "",
    "other" : "",
    "writeup" : ""
  }
}, {
  "description" : "What do we need to consider if we'll put video in our epub content?Accessibility, network access, other considerations",
  "name" : "Video in Epub",
  "notes" : "Changed the video to a smaller one. This should stop Github from whining about the size of the video. It also allows me to host everything in Github",
  "stage" : "Published",
  "type" : "Code / Writeup / Book",
  "url" : {
    "code" : "https://github.com/caraya/video-in-epub",
    "other" : "",
    "writeup" : "https://github.com/caraya/docs/edit/master/video-in-epub.md"
  }
}, {
  "description" : "Test the meteor framework to create my amazon-like reading and recommendation site",
  "name" : "Meteor App",
  "notes" : "Site is under development. Because of that we can’t really post a url until it’s close to being done",
  "stage" : "Early Research and code",
  "type" : "Code / Writeup"
}, {
  "description" : "Research open source fonts and their licenses to publish books with them to show what the different fonts look like.",
  "name" : "Fonts for ebooks",
  "notes" : "",
  "stage" : "First stage completed",
  "type" : "Code / books",
  "url" : {
    "code" : "",
    "other" : "",
    "writeup" : "http://caraya.github.io/ebook-experiments/"
  }
}, {
  "description" : "Research tools and techniques for subsetting fonts to reduce file size and comply with some fonts’ license restrictions",
  "name" : "Font subsetting",
  "notes" : "",
  "stage" : "Done",
  "type" : "Writeup",
  "url" : {
    "code" : "",
    "other" : "",
    "writeup" : "http://publishing-project.rivendellweb.net/subsetting-fonts/"
  }
}, {
  "description" : "Implement a basic epub OPF package generator in Python ",
  "name" : "Python OPF package generator",
  "notes" : "",
  "stage" : "Code: 75% done / Writeup: done",
  "type" : "Code / Writeup",
  "url" : {
    "code" : "https://github.com/caraya/ebook-experiments/tree/master/python-xml-gen",
    "other" : "",
    "writeup" : "http://publishing-project.rivendellweb.net/epub-package-opf-generator/"
  }
}, {
  "description" : "Experiment with SASS and CSS to create a basic structure for ebook css",
  "name" : "CSS basic styles for ebooks",
  "notes" : "",
  "stage" : "First stage completed, needs more research and work",
  "type" : "Code",
  "url" : {
    "code" : "https://github.com/caraya/ebook-experiments/tree/master/css-basic-for-ebooks",
    "other" : "",
    "writeup" : ""
  }
}, {
  "description" : "Create an example of a hand coded ebook ",
  "name" : "Peter Pan ebook",
  "notes" : "",
  "stage" : "First stage completed. More work on incorporating semantics and accessibility ",
  "type" : "Code",
  "url" : {
    "code" : "https://github.com/caraya/ebook-experiments/blob/master/peter-pan/",
    "other" : "https://github.com/caraya/ebook-experiments/blob/master/peter-pan/peter-pan-full.epub",
    "writeup" : ""
  }
}, {
  "description" : "Fixed Layout creation, including SASS/CSS, 2-page spreads and video",
  "name" : "Fixed Layout ebook",
  "notes" : "The repository does not contain all the necessary material or the final product dues to limitations on Github file sizes.",
  "stage" : "In progress. Work on accessibility and remote video (if possible)",
  "type" : "Code / books",
  "url" : {
    "code" : "https://github.com/caraya/fixed-layout-ebook",
    "other" : "",
    "writeup" : ""
  }
}, {
  "description" : "Experiments in long-form web publishing using some technologies in the CSS-WG pipeline such as exclusions and regions. ",
  "name" : "Long-form publishing",
  "notes" : "",
  "stage" : "In progress",
  "type" : "Code / books",
  "url" : {
    "code" : "https://github.com/caraya/ebook-experiments/tree/master/long-form",
    "other" : "",
    "writeup" : ""
  }
}, {
  "description" : "In prior posts I've written about Paged Media and Generated Content for paged media and about creating a print @media style sheet. There is another area I've been researching: how to create a book like experience using only web standards, current or proposed.",
  "name" : "Research on digital book metaphors",
  "notes" : "",
  "stage" : "Draft / In Progress",
  "type" : "Writeup",
  "url" : {
    "code" : "",
    "other" : "",
    "writeup" : "https://github.com/caraya/docs/blob/master/book-web-interfaces.md"
  }
}, {
  "description" : "Lord of the Files: How GitHub Tamed Free Software (And More) was an article first published in [Wired](http://www.wired.com/2012/02/github-2/all/) in February of 2012. It was an interesting article about a company which work I value enough to pay for the service. ",
  "name" : "Github as a collaborative publishing tool?",
  "notes" : "",
  "stage" : "Draft / In Progress",
  "type" : "Writeup",
  "url" : {
    "code" : "",
    "other" : "",
    "writeup" : "https://github.com/caraya/docs/blob/master/collaborative-writing.md"
  }
}, {
  "description" : "I'm always researching how to incorporate accessibility elements into my digital content. One of the things we can do is to add semantic elements that will, in theory, make the content more accessible to screen readers.",
  "name" : "ARIA and EPUB Semantics: how much is enough?",
  "notes" : "",
  "stage" : "Draft / In Progress",
  "type" : "Writeup",
  "url" : {
    "code" : "",
    "other" : "",
    "writeup" : "Draft: https://github.com/caraya/docs/blob/master/accessibility.md"
  }
}, {
  "description" : "Discusses a particular issue using CDN loaded  resources. When first loading an application ",
  "name" : "The Trap of CDNs",
  "notes" : "",
  "stage" : "Draft / In Progress",
  "type" : "Writeup",
  "url" : {
    "code" : "",
    "other" : "",
    "writeup" : "https://github.com/caraya/docs/blob/master/cdn-remote-loading.md"
  }
}, {
  "description" : "One of the things I see a lot when I read the #eprdctn twitter hashtag (https://twitter.com/hashtag/eprdctn?f=realtime) is how hard it is to build a coherent set of tools to  make the work of creating a valid set of HTML, CSS and Javascript resources without having to push everything to InDesign.  This article proposes a solution to this issue and a set of tools Javascript to attempt to resolve the issue.",
  "name" : "Grunt-based Content Generator",
  "notes" : "",
  "stage" : "Draft / In Progress",
  "type" : "Code / Writeup",
  "url" : {
    "code" : "https://github.com/caraya/generator-webpublish",
    "other" : "",
    "writeup" : "https://github.com/caraya/docs/blob/master/content-generator.md"
  }
}, {
  "description" : "Article explaining how to create stylesheets that will make your content looks better when printing the web page",
  "name" : "Creating Print CSS stylesheets",
  "notes" : "",
  "stage" : "Published",
  "type" : "Code / Writeup",
  "url" : {
    "code" : "",
    "other" : "",
    "writeup" : "http://publishing-project.rivendellweb.net/creating-print-css-stylesheets/"
  }
}, {
  "description" : "Reseach and development on CSS Paged Media using Paged media and Generated content for paged media specifications from W3C as the guidelines and Antenna House and Prince XML as the formatters",
  "name" : "CSS Paged Media Update",
  "notes" : "",
  "stage" : "Published",
  "type" : "Code / Writeup",
  "url" : {
    "code" : "https://github.com/caraya/ebook-experiments/tree/master/css-paged-media",
    "other" : "",
    "writeup" : "http://publishing-project.rivendellweb.net/css-paged-media-update/"
  }
}, {
  "description" : "Exclusions as prenseted in the CSS working draft allow for print-like layouts. It's mired in committee and it's only supported (partially) by IE. It's still a promising technology that allows (along with shapes) to create magazine-like layouts without resorting to images",
  "name" : "Exclusions",
  "notes" : "",
  "stage" : "Published",
  "type" : "Writeup",
  "url" : {
    "code" : "",
    "other" : "",
    "writeup" : "http://publishing-project.rivendellweb.net/exclusions/"
  }
}, {
  "description" : "Writeup on Famo.us a different way to think abut app development",
  "name" : "Famo.us: A different approach to developing web apps",
  "notes" : "",
  "stage" : "Waiting for feedback",
  "type" : "Writeup",
  "url" : {
    "code" : "",
    "other" : "",
    "writeup" : "https://github.com/caraya/docs/blob/master/famo.us.md"
  }
}, {
  "description" : "Media Queries, whether standalon or as part of SASS setup make it easier to handle multiple DPI devices in one set of stylesheets",
  "name" : "Using Media Queries to handle HDPI screens",
  "notes" : "",
  "stage" : "Published",
  "type" : "Code / Writeup",
  "url" : {
    "code" : "https://github.com/caraya/ebook-experiments/blob/master/css-basic-for-ebooks/_hdpi-mediaqueries.scss",
    "other" : "",
    "writeup" : "http://publishing-project.rivendellweb.net/using-media-queries-to-handle-hdpi-screens/"
  }
}, {
  "description" : "Makes the case for using (X)HTML as the final output of our production process and not to try and create production ready markup from the beginning. It describes some tools that are easier to use than HTML and produce HTML as a result either directly or as content for templates",
  "name" : "HTML is the final product, not the initial source",
  "notes" : "",
  "stage" : "Published",
  "type" : "Writeup",
  "url" : {
    "code" : "",
    "other" : "",
    "writeup" : "http://publishing-project.rivendellweb.net/html-is-the-final-product-not-the-initial-source/"
  }
}, {
  "description" : "Update on CSS Regions, browser suppot (or lack thereof) and what we can do with the technology right now",
  "name" : "CSS regions, part 2",
  "notes" : "",
  "stage" : "Published",
  "type" : "Code / Writeup",
  "url" : {
    "code" : "http://codepen.io/collection/DcKhj/",
    "other" : "",
    "writeup" : "http://publishing-project.rivendellweb.net/css-regions-part-2/"
  }
}, {
  "description" : "Update on CSS Shapes, browser support and what we can do with the technology",
  "name" : "CSS shapes: an update and an expansion",
  "notes" : "",
  "stage" : "Published",
  "type" : "Code / Writeup",
  "url" : {
    "code" : "http://codepen.io/caraya/pen/eDgoJ",
    "other" : "",
    "writeup" : "http://publishing-project.rivendellweb.net/css-shapes-an-update-and-an-expansion/"
  }
}, {
  "description" : "Research and code on VTT Tracks and how to use them for captioning",
  "name" : "VTT Captioning",
  "notes" : "",
  "stage" : "Published",
  "type" : "Code / Writeup",
  "url" : {
    "code" : "https://github.com/caraya/vtt-demos",
    "other" : "",
    "writeup" : "https://docs.webplatform.org/wiki/concepts/VTT_Captioning"
  }
}, {
  "description" : "Pick 2 or 3 of the projects above, plan and script a tutorial around them and create the video tutorial",
  "name" : "Creating video tutorials",
  "notes" : "",
  "stage" : "Planning",
  "type" : "Writeup and video",
  "url" : {
    "code" : "",
    "other" : "",
    "writeup" : ""
  }
}, {
  "description" : "What would a web-enabled offline first reading/engagement platform look like?",
  "name" : "Athena",
  "notes" : "",
  "stage" : "research",
  "type" : "code",
  "url" : {
    "code" : "https://github.com/caraya",
    "other" : "",
    "writeup" : ""
  }
}, {
  "description" : "Command line tool to take markdown input and produce a variety of web ready content",
  "name" : "Apollo",
  "notes" : "",
  "stage" : "early prototype",
  "type" : "code",
  "url" : {
    "code" : "https://github.com/caraya/generator-webpublish",
    "other" : "https://www.npmjs.org/package/generator-webpublish",
    "writeup" : ""
  }
} ]; // Closes $scope.projects
}); // Closes controller function
