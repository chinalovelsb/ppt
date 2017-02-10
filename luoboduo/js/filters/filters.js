/**
 * Created by Master on 2017/1/8.
 */
angular.module('app')
    .filter('urlTest', function () {
        return function (url, string) {
            var a = new RegExp('^' + string);
            return x = a.test(url)
        }
    })
    //城市
    .filter('city', function (CITY) {
        var city;
        return function (responseData) {
            angular.forEach(CITY, function (data) {
                if (responseData.city == data.CityID) {
                    return city = data.CityName
                }
            });
            return city
        }
    })
    //区县
    .filter('county', function (COUNTY) {
        var county;
        return function (responseData) {
            angular.forEach(COUNTY, function (data) {
                if (responseData.county == data.Id) {
                    return county = data.countyName
                }
            });
            return county
        }
    })

    //转时间
    .filter('timestamp', function () {
        return function (joinTime) {
            var date = new Date(joinTime).toLocaleDateString().replace(/\//g, "-");
            var t = new Date(joinTime).toTimeString().split(' ')[0].replace(/:/g, ' : ');
            return date + '　' + t;
        }
    })

    //薪资
    .filter('compensation', function (Salary) {
        var compensation;
        return function (responseData) {
            angular.forEach(Salary, function (data) {
                if (responseData.compensation == data.type) {
                    return compensation = data.compensation
                }
            });
            return compensation
        }
    })
    //公司类型
    .filter('industry', function (trade) {
        return function (responseData) {
            var industry = [];
            angular.forEach(responseData, function (data) {
                var industryItem = data.industry || data;
                angular.forEach(trade, function (data) {
                    if (industryItem.industry === data.type || industryItem === data.type) {
                        return industry.push(data.industry)
                    }
                });
            })
            return industry
        }
    })
    //经验
    .filter('experience', function (experience) {
        var value;
        return function (obj) {
            angular.forEach(experience, function (item) {
                if (obj.experience == item.type) {
                    return value = item.name
                }
            })
            return value
        }
    })
    //学历
    .filter('education', function (education) {
        var value;
        return function (obj) {
            angular.forEach(education, function (item) {
                if (obj.education == item.type) {
                    return value = item.name
                }
            })
            return value
        }
    })
    //融资规模
    .filter('financingtype', function (financingtype) {
        var value;
        return function (obj) {
            angular.forEach(financingtype, function (item) {
                if (obj.financing == item.type) {
                    return value = item.name
                }
            })
            return value
        }
    })
    .filter('hasInArr', function () {
        return function (arr, n) {
            var inArr = false;
            angular.forEach(arr, function (data) {
                data === n ? inArr = true : '';
            });
            return inArr
        }
    })
