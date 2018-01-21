/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it ('have URLs defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
                expect(feed.url).not.toBeNull();
            });
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it("have names defined", function() {
          allFeeds.forEach(function(feed) {
            expect(feed.name).toBeDefined();
            expect(feed.name).not.toBe('');
            expect(feed.name).not.toBeNull();
          });
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe("The menu", function() {

        // DOM elements used in test suite
        const menuButton = document.querySelector('.menu-icon-link'), 
        body = document.querySelector("body");

      /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

      it("should be hidden by default", function() {
        expect(body.classList.contains("menu-hidden")).toBe(true);
      });

      /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

      it("should change visibilty when menu icon is clicked", function() {
        menuButton.click();
        expect(body.classList.contains("menu-hidden")).toBe(false);
        menuButton.click();
        expect(body.classList.contains("menu-hidden")).toBe(true);
      });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe("Initial entries", function() {

      /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

      // Container for all feed entries
      let feedContainer = document.querySelector('.feed');

      // Ensure loadFeed function is executed before actual test
      beforeEach(function(done) {
          loadFeed(0, done);
      });

      it("should contain at least 1 entry when loadFeed is finished", function(done) {
          // Variable indicating that there is '.entry' element inside '.feed' node
          let containsEntry = false;

          // Check '.feed' children and if there is an '.entry' set the result to true
          Array.from(feedContainer.children).forEach(function(entry) {
              if (entry.firstElementChild.classList.contains("entry")) containsEntry = true;
        });
        expect(containsEntry).toBe(true);
        done();
      });
    });

      /* TODO: Write a new test suite named "New Feed Selection" */
      describe("New Feed Selection", function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
      // Container for all feed entries
      let feedContainer = document.querySelector('.feed');
      let beforeUpdate, afterUpdate;

      // Ensure loadFeed function is executed before actual test
      beforeEach(function(done) {
          // '.feed' content before loading another feed
          beforeUpdate = feedContainer.innerText;
          loadFeed(1, done);
      });

        it('should load new content when new feed is loaded', function (done) {
            // '.feed' content after loading new feed
            afterUpdate = feedContainer.innerText;
            expect(beforeUpdate).not.toBe(afterUpdate);
            done();
        });
      });
}());
