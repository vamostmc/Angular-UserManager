import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function NoSpaceValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
        const val = control.value;
        // Kiểm tra xem giá trị có bắt đầu bằng khoảng trắng hay không
        const hasLeadingSpace = (String(val) || '').trim().length === 0;
        // Nếu giá trị bắt đầu bằng khoảng trắng, trả về lỗi
        return hasLeadingSpace ? { NoLeadingSpace: true } : null;
      };
  }

export function dateValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      // Giả sử bạn muốn kiểm tra nếu giá trị là một năm hợp lệ
      const currentYear = new Date().getFullYear();
      const isValid = value && Number(value) >= 1900 && Number(value) <= currentYear;
      return isValid ? null : { dateValidator: true };
    };
}
