import moment from 'jalali-moment';

export const getDistanceDate=(startDate:string, endDate:string)=> {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const Difference_In_Time = start.getTime() - end.getTime();
    const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);    
    return Difference_In_Days;
  }

  export const convertToShamsi=(value:string)=>{
    return moment(value, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
  }
