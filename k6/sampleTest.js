import http from 'k6/http';
import { sleep } from 'k6';
import {htmlReport} from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import {textSummary} from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';


export const options = {
  duration: '1m',
  vus: 50,
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<500'], // 95 percent of response times must be below 500ms
  },
};

export default function () {
  const res = http.get('https://test.k6.io');
  sleep(1);
}

export function handleSummary(data) {
  return {
      'result.html': htmlReport(data),
      stdout: textSummary(data, {
          indent: ' ',
          enableColors: true
      }),
  };
}