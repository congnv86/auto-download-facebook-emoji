/*
 * Copyright 2020-present Cong Nguyen. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

const h = /_fe0f/g;

function getKeyFromCodepoints(a) {
    const strings = a.map(n => String.fromCodePoint(n));
    return strings.map(function(a) {
        return a.codePointAt(0).toString(16)
    }).join("_").replace(h, "")
}

function escape(text, html) {
    text = scope.unescape(encodeURIComponent(text));
    /** @type {number} */
    let i = 0;
    for (; i < text.length; i++) {
        html = (html << 5) - html + text.charCodeAt(i);
        html &= 4294967295;
    }
    return (html & 255).toString(16);
}

module.exports = {
    getKeyFromCodepoints,
    escape,
}
