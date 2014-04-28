var u = document.URL;
var trail = document.URL[document.URL.length - 1] == '/';
if (trail) {
  u = u.slice(0, u.length - 1);
}
var d = u.split(/\//g).length - 1 == 4;
var tree = document.URL.indexOf('/tree/') > -1;
if (tree) {
  d = u.split(/\//g).length - 1 == 6;
}
var blob = document.URL.indexOf('/blob/') > -1;
if(blob) {
  d = true;
}
if (d) {
  injectCSS();
  var githubRepo = document.URL.split('/')[4];
  var githubUser = document.URL.split('/')[3];
  generateGeoPatternBackground(githubRepo);
  createAndInsertCompareLink();
  moveCreateNewFile();
  moveBranchListing();
  var el = $('div.tooltipped-s').attr('aria-label', 'Show language statistics');
  var langs = $('.repository-lang-stats-graph').find('span').map(function () {
      return $(this).text();
    }).get().join(' + ');
  console.log(langs);
  el.attr('aria-label', langs);
  var cont = $('.site');
  cont.prepend(el);

  [
    '.octicon-repo:before',
    '.author > a > span',
    '.path-divider',
    '.js-repo-home-link',
    '.fork-flag > .text > a',
    '.fork-flag'
  ].forEach(whiteOut);
  if ($('.repo-label > span').text() == 'public')
    $('.repo-label > span').css('color', 'white');
  [
    '.subscription',
    '.overall-summary',
    '.breadcrumb > .repo-root',
    '.breadcrumb > .separator',
    '.sunken-menu-separator',
    '.in-mid-page'
  ].forEach(remove);
  setTimeout(scrolldown, 200);
}
function generateGeoPatternBackground(githubRepo) {
  //var pattern = GeoPattern.generate(githubRepo, {baseColor: '#333'});
  var t = new Trianglify({
      cellsize: 128,
      noiseIntensity: 0.2
    });
  var pattern = t.generate(document.body.clientWidth, 128);
  $('.pagehead').css({
    'border-bottom': 'none',
    'padding': '2.5% 0',
    'background-image': pattern.dataUrl
  });
}
function createAndInsertCompareLink() {
  var $compareLink = $('.file-navigation > a').removeClass().addClass('tooltipped tooltipped-n').css({
      'color': 'white',
      'font-size': '15px',
      'padding-right': '20px'
    }).append('compare');
  $('.file-navigation > a').remove();
  $listEl = $('<li>').append($compareLink);
  $('.pagehead-actions').prepend($listEl);
}
function moveCreateNewFile() {
  $createNewFile = $('.js-new-blob-form').css('color', 'white');
  $divider = $('<span class=\'path-divider new-github\' style=\'color: white\'>/</span>');
  $divider.insertAfter('.entry-title > strong');
  $createNewFile.insertAfter('.new-github');
  $('.js-new-blob-submit').css({
    'color': 'white',
    'padding-left': '5px'
  });
}
function moveBranchListing() {

  var githubRepo = document.URL.split('/')[4];
  var githubUser = document.URL.split('/')[3];

  var commitcount = $('.numbers-summary').find(">:first-child").map(function() {
    window.xyz = $(this)
    return $(this).find(">:first-child").find(">:first-child").text().trim();
  }).get()[0];

  var commits = $('<li>').append($('<a href="/' + githubRepo + '/' + githubUser + '/commits" aria-label="View the latest commits" class="tooltipped tooltipped-n" data-pjax="" style="color: white; font-size: 15px; padding-right: 20px;"><span class="octicon octicon-history"></span> ' + commitcount + '</a>'));

  $buttonContainer = $('.select-menu').last();
  $buttonContainer.children().find('i').remove();
  // Clear out uneeded button styles
  $buttonContainer.children().first().css({
    'color': 'white',
    'background': 'none',
    'text-shadow': 'none',
    'border': 'none',
    'font-weight': 'normal',
    'font-size': '15px'
  });
  $listEl = $('<li>').append($buttonContainer);
  $('.pagehead-actions').prepend($listEl);
  $('.pagehead-actions li:nth-child(3n)').after(commits);
}
// This is due to the constraint right now that I only style the main repo page
function injectCSS() {
  var styleCSS = '<style>                    .white {                         color: white !important;                     }                    .octicon-repo:before {                      color: white !important;                      opacity: 0.6 !important;                    }                    .starred, .subscription, .unstarred, .social-count, .fork-button {                      border-color: rgba(51, 51, 51, 0.6) !important;                    }                    </style>';
  $('head').append(styleCSS);
}
function remove(element, index, array) {
  $(element).remove();
}
function whiteOut(element, index, array) {
  $(element).addClass('white');
}
function scrolldown() {
  $('html, body').animate({scrollTop: '+=41px'}, 200);
}
