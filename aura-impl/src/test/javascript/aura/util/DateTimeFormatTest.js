/*
 * Copyright (C) 2013 salesforce.com, inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Function.RegisterNamespace("Test.Aura.Util");

/**
 * Tests for DateTimeFormat class
 */
[Fixture]
Test.Aura.Util.DateTimeFormatTest = function() {
    var Aura = {
        Utils: { Util: {} },
        Services: {},
    };

    // Mock the exp() function defined in Aura.js, this is originally used for exposing members using a export.js file
    Mocks.GetMocks(Object.Global(), {
        "Aura": Aura,
        "AuraLocalizationService": function(){},
    })(function() {
        [Import("aura-impl/src/main/resources/aura/AuraLocalizationService.js")]
        [Import("aura-impl/src/main/resources/aura/util/DateTimeFormat.js"),
         Import("aura-impl/src/main/resources/aura/util/Locale.js")]
    });

    [Fixture]
    function format() {

        var mockAura = Mocks.GetMocks(Object.Global(), {
            "$A": {
                localizationService: new Aura.Services.AuraLocalizationService()
            },
            "Aura": Aura
        });

        [Fact]
        function FormatsDateTime() {
            var date = new Date(2014, 9, 23, 16, 30, 45);
            var expected = "Oct 23, 2014 4:30:45 PM";
            var actual;

            mockAura(function() {
                var locale = new Aura.Utils.Locale("en-US");
                var dateTimeFormat = new Aura.Utils.DateTimeFormat("MMM dd, yyyy h:mm:ss a", locale);
                actual = dateTimeFormat.format(date);
            });

            Assert.Equal(expected, actual);
        }

        [Fact]
        function FormatsDateTimeWithOffset() {
            var date = new Date(2014, 9, 23, 16, 30, 45);
            var expected = "2014-10-23T04:30:45-07:00";
            var actual;

            mockAura(function() {
                var locale = new Aura.Utils.Locale("en-US");
                var dateTimeFormat = new Aura.Utils.DateTimeFormat("yyyy-MM-ddThh:mm:ssZ", locale);
                actual = dateTimeFormat.format(date, -420);
            });

            Assert.Equal(expected, actual);
        }

        [Fact]
        function FormatsDateTimeWithNoDelimiterOffset() {
            var date = new Date(2014, 9, 23, 16, 30, 45);
            var expected = "2014-10-23 4:30 +0000";
            var actual;

            mockAura(function() {
                var locale = new Aura.Utils.Locale("en-US");
                var dateTimeFormat = new Aura.Utils.DateTimeFormat("yyyy-MM-dd h:mm ZZ", locale);
                actual = dateTimeFormat.format(date, 0);
            });

            Assert.Equal(expected, actual);
        }

        [Fact]
        function FormatsDateTimeWithPaddings() {
            var date = new Date(2014, 7, 8, 2, 3, 4, 3);
            var expected = "2014-08-08T02:03:04.003";
            var actual;

            mockAura(function() {
                var locale = new Aura.Utils.Locale("en-US");
                var dateTimeFormat = new Aura.Utils.DateTimeFormat("yyyy-MM-ddThh:mm:ss.SSS", locale);
                actual = dateTimeFormat.format(date);
            });

            Assert.Equal(expected, actual);
        }

        [Fact]
        function Formats24HourFormat() {
            var date = new Date(2014, 9, 23, 16, 30, 45);
            var expected = "Oct 23, 2014 16:30:45";
            var actual;

            mockAura(function() {
                var locale = new Aura.Utils.Locale("en-US");
                var dateTimeFormat = new Aura.Utils.DateTimeFormat("MMM dd, yyyy H:mm:ss", locale);
                actual = dateTimeFormat.format(date);
            });

            Assert.Equal(expected, actual);
        }

        [Fact]
        function Formats24HourFormatWithPaddings() {
            var date = new Date(2014, 9, 3, 4, 30, 45);
            var expected = "Oct 03, 2014 04:30:45";
            var actual;

            mockAura(function() {
                var locale = new Aura.Utils.Locale("en-US");
                var dateTimeFormat = new Aura.Utils.DateTimeFormat("MMM dd, yyyy HH:mm:ss", locale);
                actual = dateTimeFormat.format(date);
            });

            Assert.Equal(expected, actual);
        }


        [Fact]
        function FormatsDateTimeWithH24Cycle() {
            var date = new Date(2014, 9, 23, 0, 30, 45);
            var expected = "Oct 23, 2014 24:30:45";
            var actual;

            mockAura(function() {
                var locale = new Aura.Utils.Locale("en-US");
                var dateTimeFormat = new Aura.Utils.DateTimeFormat("MMM dd, yyyy kk:mm:ss", locale);
                actual = dateTimeFormat.format(date);
            });

            Assert.Equal(expected, actual);
        }

        [Fact]
        function FormatsMidnightWithNoPadding() {
            var date = new Date(2014, 9, 23, 0, 0, 0, 0);
            var expected = "0:0";
            var actual;

            mockAura(function() {
                var locale = new Aura.Utils.Locale("en-US");
                var dateTimeFormat = new Aura.Utils.DateTimeFormat("H:m", locale);
                actual = dateTimeFormat.format(date);
            });

            Assert.Equal(expected, actual);
        }

        [Fact]
        function FormatsDateTimeWithWeekday() {
            var date = new Date(2014, 9, 23, 1, 30, 45);
            var expected = "Thursday, October 23, 2014 1:30 AM";
            var actual;

            mockAura(function() {
                var locale = new Aura.Utils.Locale("en-US");
                var dateTimeFormat = new Aura.Utils.DateTimeFormat("EEEE, MMMM dd, yyyy h:mm a", locale);
                actual = dateTimeFormat.format(date);
            });

            Assert.Equal(expected, actual);
        }

        [Fact]
        function FormatsWeekInYear() {
            var date = new Date(2014, 9, 23);
            var expected = "43";
            var actual;

            mockAura(function() {
                var locale = new Aura.Utils.Locale("en-US");
                var dateTimeFormat = new Aura.Utils.DateTimeFormat("ww", locale);
                actual = dateTimeFormat.format(date);
            });

            Assert.Equal(expected, actual);
        }

        [Fact]
        function FormatsWeekInYearWithPaddings() {
            var date = new Date(2014, 1, 1);
            var expected = "05";
            var actual;

            mockAura(function() {
                var locale = new Aura.Utils.Locale("en-US");
                var dateTimeFormat = new Aura.Utils.DateTimeFormat("ww", locale);
                actual = dateTimeFormat.format(date);
            });

            Assert.Equal(expected, actual);
        }

        function FormatsQuarter() {
            var date = new Date(2014, 8, 30);
            var expected = "3";
            var actual;

            mockAura(function() {
                var locale = new Aura.Utils.Locale("en-US");
                var dateTimeFormat = new Aura.Utils.DateTimeFormat("Q", locale);
                actual = dateTimeFormat.format(date);
            });

            Assert.Equal(expected, actual);
        }

        [Fact]
        function FormatsDayOfWeekNumber() {
            var date = new Date(2018, 4, 17);
            var expected = 4;
            var actual;

            mockAura(function() {
                var locale = new Aura.Utils.Locale("en-US");
                var dateTimeFormat = new Aura.Utils.DateTimeFormat("E", locale);
                actual = dateTimeFormat.format(date);
            });

            Assert.Equal(expected, actual);
        }

        [Fact]
        function FormatsDayOfWeekShort() {
            var date = new Date(2018, 4, 17);
            var expected = "Thu";
            var actual;

            mockAura(function() {
                var locale = new Aura.Utils.Locale("en-US");
                var dateTimeFormat = new Aura.Utils.DateTimeFormat("EEE", locale);
                actual = dateTimeFormat.format(date);
            });

            Assert.Equal(expected, actual);
        }

        [Fact]
        function FormatsDayOfWeekLong() {
            var date = new Date(2018, 4, 17);
            var expected = "Thursday";
            var actual;

            mockAura(function() {
                var locale = new Aura.Utils.Locale("en-US");
                var dateTimeFormat = new Aura.Utils.DateTimeFormat("EEEE", locale);
                actual = dateTimeFormat.format(date);
            });

            Assert.Equal(expected, actual);
        }

        [Fact]
        function FormatsLocalizedTime() {
            var date = new Date(2014, 9, 23, 23, 30, 45);
            var expected = "11:30 PM";
            var actual;

            mockAura(function() {
                var locale = new Aura.Utils.Locale("en-US");
                var dateTimeFormat = new Aura.Utils.DateTimeFormat("LT", locale);
                actual = dateTimeFormat.format(date);
            });

            Assert.Equal(expected, actual);
        }

        [Fact]
        function FormatsLocalizedTimeWithSecond() {
            var date = new Date(2014, 9, 23, 14, 30, 45);
            var expected = "2:30:45 PM";
            var actual;

            mockAura(function() {
                var locale = new Aura.Utils.Locale("en-US");
                var dateTimeFormat = new Aura.Utils.DateTimeFormat("LTS", locale);
                actual = dateTimeFormat.format(date);
            });

            Assert.Equal(expected, actual);
        }

        [Fact]
        function FormatsLocalizedDateInNumberStyleWithPadding() {
            var date = new Date(2014, 8, 23);
            var expected = "09/23/2014";
            var actual;

            mockAura(function() {
                var locale = new Aura.Utils.Locale("en-US");
                var dateTimeFormat = new Aura.Utils.DateTimeFormat("L", locale);
                actual = dateTimeFormat.format(date);
            });

            Assert.Equal(expected, actual);
        }

        [Fact]
        function FormatsLocalizedDateInNumberStyle() {
            var date = new Date(2014, 8, 23);
            var expected = "9/23/2014";
            var actual;

            mockAura(function() {
                var locale = new Aura.Utils.Locale("en-US");
                var dateTimeFormat = new Aura.Utils.DateTimeFormat("l", locale);
                actual = dateTimeFormat.format(date);
            });

            Assert.Equal(expected, actual);
        }

        [Fact]
        function FormatsLocalizedDateInLongStyle() {
            var date = new Date(2014, 8, 23);
            var expected = "September 23, 2014";
            var actual;

            mockAura(function() {
                var locale = new Aura.Utils.Locale("en-US");
                var dateTimeFormat = new Aura.Utils.DateTimeFormat("LL", locale);
                actual = dateTimeFormat.format(date);
            });

            Assert.Equal(expected, actual);
        }

        [Fact]
        function FormatsLocalizedDateInShortStyle() {
            var date = new Date(2014, 8, 23);
            var expected = "Sep 23, 2014";
            var actual;

            mockAura(function() {
                var locale = new Aura.Utils.Locale("en-US");
                var dateTimeFormat = new Aura.Utils.DateTimeFormat("ll", locale);
                actual = dateTimeFormat.format(date);
            });

            Assert.Equal(expected, actual);
        }

        [Fact]
        function FormatsLocalizedDateTimeInLongStyle() {
            var date = new Date(2014, 8, 23, 3, 30, 45);
            var expected = "September 23, 2014, 3:30 AM";
            var actual;

            mockAura(function() {
                var locale = new Aura.Utils.Locale("en-US");
                var dateTimeFormat = new Aura.Utils.DateTimeFormat("LLL", locale);
                actual = dateTimeFormat.format(date);
            });

            Assert.Equal(expected, actual);
        }

        [Fact]
        function FormatsLocalizedDateTimeInShortStyle() {
            var date = new Date(2014, 8, 23, 3, 30, 45);
            var expected = "Sep 23, 2014, 3:30 AM";
            var actual;

            mockAura(function() {
                var locale = new Aura.Utils.Locale("en-US");
                var dateTimeFormat = new Aura.Utils.DateTimeFormat("lll", locale);
                actual = dateTimeFormat.format(date);
            });

            Assert.Equal(expected, actual);
        }

        [Fact]
        function FormatsLocalizedDateTimeInLongStyleWithDayOfWeek() {
            var date = new Date(2014, 8, 23, 3, 30, 45);
            var expected = "Tuesday, September 23, 2014, 3:30 AM";
            var actual;

            mockAura(function() {
                var locale = new Aura.Utils.Locale("en-US");
                var dateTimeFormat = new Aura.Utils.DateTimeFormat("LLLL", locale);
                actual = dateTimeFormat.format(date);
            });

            Assert.Equal(expected, actual);
        }

        [Fact]
        function FormatsLocalizedDateTimeInShortStyleWithDayOfWeek() {
            var date = new Date(2014, 8, 23, 3, 30, 45);
            var expected = "Tue, Sep 23, 2014, 3:30 AM";
            var actual;

            mockAura(function() {
                var locale = new Aura.Utils.Locale("en-US");
                var dateTimeFormat = new Aura.Utils.DateTimeFormat("llll", locale);
                actual = dateTimeFormat.format(date);
            });

            Assert.Equal(expected, actual);
        }
    }


    [Fixture]
    function formatWithoutFormatToPartsSupport() {

        var localizationService = new Aura.Services.AuraLocalizationService();
        localizationService.canFormatToParts = function() {
            return false;
        };

        var mockAura = Mocks.GetMocks(Object.Global(), {
            "$A": {
                "localizationService": localizationService
            },
            "Aura": Aura
        });

        [Fact]
        function FormatsDateTime() {
            var date = new Date(2014, 9, 23, 16, 5, 45);
            var expected = "Oct 23, 2014 4:05:45 PM";
            var actual;

            mockAura(function() {
                var locale = new Aura.Utils.Locale("en-US");
                var dateTimeFormat = new Aura.Utils.DateTimeFormat("MMM dd, yyyy h:mm:ss a", locale);
                actual = dateTimeFormat.format(date);
            });

            Assert.Equal(expected, actual);
        }

        [Fact]
        function FormatsDateTimeWithH12Cycle() {
            var date = new Date(2014, 9, 23, 12);
            var expected = "Oct 23, 2014 12:00:00 PM";
            var actual;

            mockAura(function() {
                var locale = new Aura.Utils.Locale("en-US");
                var dateTimeFormat = new Aura.Utils.DateTimeFormat("MMM dd, yyyy h:mm:ss a", locale);
                actual = dateTimeFormat.format(date);
            });

            Assert.Equal(expected, actual);
        }

        [Fact]
        function FormatsDateTimeWithOffset() {
            var date = new Date(2014, 9, 23, 16, 30, 45);
            var expected = "2014-10-23T04:30:45-07:00";
            var actual;

            mockAura(function() {
                var locale = new Aura.Utils.Locale("en-US");
                var dateTimeFormat = new Aura.Utils.DateTimeFormat("yyyy-MM-ddThh:mm:ssZ", locale);
                actual = dateTimeFormat.format(date, -420);
            });

            Assert.Equal(expected, actual);
        }

        [Fact]
        function FormatsDateTimeWithPaddings() {
            var date = new Date(2014, 7, 8, 2, 3, 4, 3);
            var expected = "2014-08-08T02:03:04.003";
            var actual;

            mockAura(function() {
                var locale = new Aura.Utils.Locale("en-US");
                var dateTimeFormat = new Aura.Utils.DateTimeFormat("yyyy-MM-ddThh:mm:ss.SSS", locale);
                actual = dateTimeFormat.format(date);
            });

            Assert.Equal(expected, actual);
        }

        [Fact]
        function Formats2DigitStyleYear() {
            var date = new Date(2014, 9, 23);
            var expected = "10/23/14";
            var actual;

            mockAura(function() {
                var locale = new Aura.Utils.Locale("en-US");
                var dateTimeFormat = new Aura.Utils.DateTimeFormat("MM/dd/yy", locale);
                actual = dateTimeFormat.format(date);
            });

            Assert.Equal(expected, actual);
        }

        [Fact]
        function FormatsMidnightWithNoPadding() {
            var date = new Date(2014, 9, 23, 0, 0, 0, 0);
            var expected = "0:0";
            var actual;

            mockAura(function() {
                var locale = new Aura.Utils.Locale("en-US");
                var dateTimeFormat = new Aura.Utils.DateTimeFormat("H:m", locale);
                actual = dateTimeFormat.format(date);
            });

            Assert.Equal(expected, actual);
        }

        [Fact]
        function Formats24HourFormat() {
            var date = new Date(2014, 9, 23, 16, 30, 45);
            var expected = "Oct 23, 2014 16:30:45";
            var actual;

            mockAura(function() {
                var locale = new Aura.Utils.Locale("en-US");
                var dateTimeFormat = new Aura.Utils.DateTimeFormat("MMM dd, yyyy H:mm:ss", locale);
                actual = dateTimeFormat.format(date);
            });

            Assert.Equal(expected, actual);
        }

        [Fact]
        function Formats24HourFormatWithPaddings() {
            var date = new Date(2014, 9, 3, 4, 30, 45);
            var expected = "Oct 03, 2014 04:30:45";
            var actual;

            mockAura(function() {
                var locale = new Aura.Utils.Locale("en-US");
                var dateTimeFormat = new Aura.Utils.DateTimeFormat("MMM dd, yyyy HH:mm:ss", locale);
                actual = dateTimeFormat.format(date);
            });

            Assert.Equal(expected, actual);
        }

        [Fact]
        function FormatsDateTimeWithH24Cycle() {
            var date = new Date(2014, 9, 23, 0, 30, 45);
            var expected = "Oct 23, 2014 24:30:45";
            var actual;

            mockAura(function() {
                var locale = new Aura.Utils.Locale("en-US");
                var dateTimeFormat = new Aura.Utils.DateTimeFormat("MMM dd, yyyy kk:mm:ss", locale);
                actual = dateTimeFormat.format(date);
            });

            Assert.Equal(expected, actual);
        }

        [Fact]
        function FormatsDateTimeWithWeekday() {
            var date = new Date(2014, 9, 23, 1, 30, 45);
            var expected = "Thursday, October 23, 2014 1:30 AM";
            var actual;

            mockAura(function() {
                var locale = new Aura.Utils.Locale("en-US");
                var dateTimeFormat = new Aura.Utils.DateTimeFormat("EEEE, MMMM dd, yyyy h:mm a", locale);
                actual = dateTimeFormat.format(date);
            });

            Assert.Equal(expected, actual);
        }

        [Fact]
        function FormatsWeekInYear() {
            var date = new Date(2014, 9, 23);
            var expected = "43";
            var actual;

            mockAura(function() {
                var locale = new Aura.Utils.Locale("en-US");
                var dateTimeFormat = new Aura.Utils.DateTimeFormat("ww", locale);
                actual = dateTimeFormat.format(date);
            });

            Assert.Equal(expected, actual);
        }

        [Fact]
        function FormatsWeekInYearWithPaddings() {
            var date = new Date(2014, 1, 1);
            var expected = "05";
            var actual;

            mockAura(function() {
                var locale = new Aura.Utils.Locale("en-US");
                var dateTimeFormat = new Aura.Utils.DateTimeFormat("ww", locale);
                actual = dateTimeFormat.format(date);
            });

            Assert.Equal(expected, actual);
        }

    }
}
