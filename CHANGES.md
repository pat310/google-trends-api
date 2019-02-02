#### [v4.9.0]
> Feb 2, 2019
- Adds support for a single keyword string with an array of geo locations
[#116]: https://github.com/pat310/google-trends-api/pull/116

#### [v4.7.0]
> July 14, 2018
- Allowing locations for different keywords
[#111]: https://github.com/pat310/google-trends-api/pull/111

#### [v4.6.2]
> May 29, 2018
- Fixing 429 errors from google trends
[#106]: https://github.com/pat310/google-trends-api/pull/106

#### [v4.6.1]
> Feb 21, 2018
- Fixing proxy bug by adding proxy to `nextOptions`
[#95]: https://github.com/pat310/google-trends-api/pull/94

## [v4.6.0]
> Feb 19, 2018
- Ability to specify a google property filter
[#94]: https://github.com/pat310/google-trends-api/pull/94

# [v4.5.0]
> Jan 31, 2018
- Adding ability to use a proxy server
[#92]: https://github.com/pat310/google-trends-api/pull/92

## [v4.4.0]
> Jan 12, 2018
- Added `timezone` number, defaults to the time zone difference in minutes from UTC to host system settings

[#90]: https://github.com/pat310/google-trends-api/pull/90

## [v4.3.0]
> Oct 22, 2017
- Added `granularTimeResolution` boolean as optional input object parameter, when true will default to finest time resolution possible

[#84]: https://github.com/pat310/google-trends-api/pull/84

## [v4.2.2]
> Sep 7, 2017
- Using widget `id` rather than `title` for determining token. Title changes for region from `Interest by region` to `Interest by subregion` in certain scenarios. When this would happen, the lookup would break.

[#78]: https://github.com/pat310/google-trends-api/pull/78

## [v4.2.1]
> Sep 1, 2017
- Unicode characters in results are decoded by default
- Corrected a bug when a user tries to perform a comparison with a search topic and a search term

[#74]: https://github.com/pat310/google-trends-api/pull/74
[#76]: https://github.com/pat310/google-trends-api/pull/76

## [v4.2.0]
> Aug 21, 2017
- Added a new api method which returns the results from the "add a search term" input box in the UI: `autoComplete`
- Added a new optional parameter to include in the search query: `category`. Category is input as a [number](https://github.com/pat310/google-trends-api/wiki/Google-Trends-Categories)

[#70]: https://github.com/pat310/google-trends-api/pull/70
[#72]: https://github.com/pat310/google-trends-api/pull/72

## [v4.1.0]
> Mar 16, 2017
- Added ability to search trends across [multiple keywords](https://github.com/pat310/google-trends-api#multiple-keywords)
- Catching errors on failed JSON.parse

[#54]: https://github.com/pat310/google-trends-api/pull/54
[#58]: https://github.com/pat310/google-trends-api/pull/58

## [v4.0.1]
> Feb 13, 2017
- actually building before committing
- added a preversion script to ensure build occurs

## [v4.0.0]
> Feb 13, 2017

- removed all old api methods
- added four new api methods:
  - `interestByRegion`
  - `interestOverTime`
  - `relatedQueries`
  - `relatedTopics`
- removed all dependencies
- adding [codeclimate](https://codeclimate.com/github/pat310/google-trends-api)
- fixing [coveralls](https://coveralls.io/github/pat310/google-trends-api)
- removed old tests and added new tests for new methods
- adding eslint and following [airbnb](https://github.com/airbnb/javascript) style guide
- updated README accordingly

[#47]: https://github.com/pat310/google-trends-api/pull/47

## [v3.0.2]
> Feb 3, 2017

- removing node specific `__dirname` so library can be used in browser

[#44]: https://github.com/pat310/google-trends-api/pull/44

## [v3.0.1]
> Oct 31, 2016

- removing `cheerio` as a dependency by replacing it with regex ([#35])

[#35]: https://github.com/pat310/google-trends-api/pull/35

## [v3.0.0]
> Oct 22, 2016

- `topRelated` now correctly using `TOP_QUERIES` rather than `RISING_QUERIES` ([#34])
- `topRelated` now accepts an optional `timePeriod` object that will return trend data based on a provided time period ([#34])
- Added `risingSearches` method which accepts `category`, `timePeriod` and `geo` ([#34])

[#34]: https://github.com/pat310/google-trends-api/pull/34

## [v2.1.0]
> Oct 22, 2016

- `trendData` now accepts an optional `timePeriod` object that will return trend data based on a provided time period ([#33])

[#33]: https://github.com/pat310/google-trends-api/pull/33

## [v2.0.0]
> Oct 22, 2016

- `trendData` now returns [IETF-compliant RFC 2822 timestamps](https://tools.ietf.org/html/rfc2822#page-14) ([#32])
- Adding New Zealand to list of country codes

[#32]: https://github.com/pat310/google-trends-api/pull/32
