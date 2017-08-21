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
