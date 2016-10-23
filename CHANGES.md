## [v2.2.0]
> Oct 22, 2016

- `topRelated` now correctly using `TOP_QUERIES` rather than `RISING_QUERIES` ([#34])
- `topRelated` now accepts an optional `timePeriod` object that will return trend data based on a provided time period ([#34])
- Added `topRising` method which accepts `category`, `timePeriod` and `geo` ([#34])

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