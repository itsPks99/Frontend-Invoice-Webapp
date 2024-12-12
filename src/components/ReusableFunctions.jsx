class ReusableFunctions {
    // Function to format numbers into words
    static numberToWords(num) {
      const a = [
        '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
        'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
      ];
      const b = [
        '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
      ];
      const g = [
        '', 'Thousand', 'Million', 'Billion'
      ];
  
      if (typeof num !== 'number' || num < 0) return 'Invalid number';
      if (num === 0) return 'Zero Dollars';
  
      let str = '';
      let chunkCount = 0;
  
      while (num > 0) {
        let chunk = num % 1000;
        if (chunk > 0) {
          str = ReusableFunctions.chunkToWords(chunk, a, b) + ' ' + g[chunkCount] + ' ' + str;
        }
        num = Math.floor(num / 1000);
        chunkCount++;
      }
  
      return str.trim() + ' Dollars';
    }
  
    static chunkToWords(chunk, a, b) {
      let str = '';
      if (chunk > 99) {
        str += a[Math.floor(chunk / 100)] + ' Hundred ';
        chunk %= 100;
      }
      if (chunk > 19) {
        str += b[Math.floor(chunk / 10)] + ' ';
        chunk %= 10;
      }
      if (chunk > 0) {
        str += a[chunk] + ' ';
      }
      return str.trim();
    }
  
    // Function to format dates
    static formatDate(date, format = "DD-MM-YYYY") {
      const inputDate = new Date(date);
      if (isNaN(inputDate.getTime())) {
        throw new Error("Invalid date provided");
      }
  
      const day = String(inputDate.getDate()).padStart(2, "0");
      const month = String(inputDate.getMonth() + 1).padStart(2, "0");
      const year = inputDate.getFullYear();
  
      return format
        .replace(/DD/, day)
        .replace(/MM/, month)
        .replace(/YYYY/, year);
    }
  }
  
  export default ReusableFunctions;
  