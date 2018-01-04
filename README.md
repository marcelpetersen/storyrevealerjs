Storyrevealer.js
================

 

Simple, json-fed story teller engine based on [Reveal.js](http://revealjs.com).

Inspired by the elegance and simplicity of [deltatre'
SportTeller](http://www.deltatre.com/online-solutions/sportteller/) (with
examples
[here](http://www.europeantour.com/sportteller/us-open-day-4-in-numbers.html),
[here](http://www.gaa.ie/sportteller-content/stories/1/1/55b33bda-d289-41a6-ba6e-a3e094201f36/index.html#Slide_2),
and
[here](http://www.europeantour.com/sportteller/bmw-pga-championship-day-1-in-numbers.html)),
here is a simpler, free, alternative.

Storyrevealer creates a single web page, called a newspaper, which contains
stories. Stories in a newspaper are scrolled horizontally. A story is a list of
pages. A single story is scrolled vertically.

A page is a background image, animation, or video, with content laid over it.
Content is a collection of information displayed as text, table, or graphics.

Storyrevealer uses Reveal.js plugins, like the Anything plugin, to display and
animate your content. (Anything plugin is so generic that you can really stick
anything in a slide' section)

Storyrevealer just started, so expect documentation, tests, and more examples in
the following weeks.

 

Pierre M. - December 2017

 

JSON Data File Format
---------------------

 

The JSON datafile handled by Storyrevealer may contain either

-   a single story, or

-   a collection of stories, called a newspaper.

 

### Newspaper

A newspaper is made of an optional cover page and Stories.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
{
    "cover": {{page}},
    "stories": [ {{story-element}}+ ]
}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The newspaper’s cover page is a regular, additional page.

 

### Story

A story is made of an optional cover page and Pages

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
{
    "cover": {{page}},
    "pages": [ {{page}}+ ]
}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The story’s cover page is a regular, additional page.

 

### Page

A page is made of one or more columns.

 

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
"page": {{column}} || [ {{column}}{2,} ]
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

 

When a page is made of more than one column, decorating elements of the
**first** column are taken into account for decorating the entire page
(background image, video, or additional classes.)

 

A column is an object with content properties.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
column: { {{content}}* }
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

 

If a column does not contain any content property, it is a blank page or column.

 

### Content Properties

A content property is a ( content-type = content-value ) pair.

 

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
"content-type": {{content-value}}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

 

Content-value is a valid JSON object and its form varies depending on the
content-type.

If a page contains more than one content property, they are displayed in
appearing order.

Storyrevealer provides a set of content-type properties together with their
representation. We make an artificial distinction between 3 types of
content-type properties:

1.  Decoration properties affect the page of column appearance,

2.  Data properties, and

3.  Content properties add content to the page.

 

#### Decoration Properties

Decoration properties mainly affect the appearance of the page.

| **Content Type**    | **Value**      | **Note**                                                                                                              |
|---------------------|----------------|-----------------------------------------------------------------------------------------------------------------------|
| background or image | URL of image   | Displayed as background image                                                                                         |
| video               | URL of video   | Displayed as background video. Plays automatically when page is shown                                                 |
| class               | CSS class name | Single class name is added to the page’s parent element. A page-element may contain more than one class content type. |

 

#### Data Properties

Data properties are relayed to Reveal.js element entities.

| **Content Type**      | **Value**    | **Note**         |
|-----------------------|--------------|------------------|
| data-background-color | RGB(A) Color | Background color |

Data elements are added to the parent element as data attributes.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
<section data-background-color="#ddd">
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

It is possible to add Reveal.js specific data attributes to control transitions,
background transitions, or any other data attribute.  

 

#### Text Content Properties

Text content is the simplest form of content laid over the background.

The following text content elements are accepted:

| **Text Content** | **Purpose**                  | **Display**                          |
|------------------|------------------------------|--------------------------------------|
| title            | Main title of page           | Bold, larg text in middle of screen. |
| editor           | Display editor information   | Meant to be used on cover pages      |
| date             | Date of story                | Meant to be used on cover pages      |
| above-title      | Text displayed above a title | Displayed in small caps.             |
| under-title      | Text displayed under a title | Displayed in bolder font             |
| credits          |                              |                                      |
| copyright        |                              |                                      |
| text             | Regular text                 |                                      |
| quote            | Quoted text                  |                                      |

 

##### Text Content Element Styling 

The content-type name can contain additional CSS class names that must be added
to its HTML parent element.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
title.huge.reverse: Hello
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

will become

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
<h1 class="huge reverse">Hello</h1>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

 

The following class names have special meaning:

| **Class Name** | **Description**                                                                             |
|----------------|---------------------------------------------------------------------------------------------|
| fragment       | Reveal.js Frament element                                                                   |
| html           | The provided text is HTML formatted. It will be sanitized and sent directly to the browser. |

 

The following class names are also provided and can be customized.

| **Class Name** | **Description**                                             |
|----------------|-------------------------------------------------------------|
| darker         | Places a transparent darker background under the text       |
| darkest        | Places a less transparent darker background under the text  |
| lighter        | Places a transparent lighter background under the text      |
| lightest       | Places a less transparent lighter background under the text |
| left           | Align text to the left of the page/column                   |
| right          | Align text to the right of the page/column                  |
| bottom-left    | Places text in bottom, left corner of page                  |
| bottom-right   | Places text in bottom, left corner of page                  |
| top-left       | Places text in bottom, left corner of page                  |
| top-right      | Places text in bottom, left corner of page                  |
| allcaps        | Transform text to uppercase                                 |
| reverse        | Uses background color for text                              |
| huge           | Increases font size to 150%                                 |

These classes are provided for your convenience but essentially show how you can
add your own styling to your newspaper stories. Additional class names can be
added and used in Storyrevealer.

 

##### Text Content Element HTML Mapping 

Each text content element is mapped to an HTML element.

The mapped element can also contain additional classes.

In the above exemple, if `title` is mapped to `h1.left` the generated HTML will
be

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
<h1 class="huge reverse left">Hello</h1>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Mapping of content elements can be provided as a Storyrevealer option.

 

#### Table

The table structure contains two parts.

 

The first part contains table options.

The following options are accepted: rowheader, rowfooter, columnheader, column
footer. They are all boolean and tells whether data contains such row or column
header or footer.

 

The second part contains the data. Table data is an Array; each element of the
array represents a table row.

Each row is represented by an Array; each element of the array is the table cell
content.

 

#### Graphs

Storyrevealer aims at, and purposely limits itself to, very simple, clear,
straightforward, bold, graphs.

Most graphs are animated but not interactive.

 

There are two methods to create graphs.

 

The first method uses the content-type `barchart`, `linechart`, and `piechart`
to create standard bar, line and pie chart respectively. Data need to presented
in a standard way. No option can be changed.

These types of graphs are suitable for simple graphs.

 

The second method uses the content-type « chart ». Data need to be presented in
the the way the graphing package expects it.

This method allow to display any type of graph that the graphing package can
display.

 
