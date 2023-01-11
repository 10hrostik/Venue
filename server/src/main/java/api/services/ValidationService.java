package api.services;

import org.springframework.stereotype.Service;
import java.util.List;
import org.springframework.validation.ObjectError;

@Service
public class ValidationService {

    public String getErrorMessages(List<ObjectError> errors) {
        StringBuffer error = new StringBuffer(" ");
        for (Object errorMessage : errors) {
           StringBuffer errorStringBuffer = new StringBuffer(errorMessage.toString());
           String errorString = findTargetMessage(errorStringBuffer);
           error.append(errorString);
        }
        return error.toString();
   }

   private String findTargetMessage(StringBuffer error) {
        short flag = 0;
        int index = 0;
        for (int i = error.length() - 1;; i--) {
            if (error.charAt(i) == ']' || error.charAt(i) == '[') {
                flag++;
            }
            if (flag == 2) {
                index = i;
                break;
            }
        }
        return (String) error.subSequence(index + 1, error.length() - 1) + "\n";
   }
}
