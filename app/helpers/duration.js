import { helper } from '@ember/component/helper';

function duration([beginTime]) {
    return new Date() - beginTime;
}

export default helper(duration);
