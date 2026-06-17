package akstek.backend.common.response;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ApiResponse<T> {
    private boolean success;
    private String message;
    private T data;
    private String errorCode;

    public static <T> ApiResponse<T> success(T data){
        return new ApiResponse<>(true, "Success", data, null);
    }

    public static <T> ApiResponse<T> error(String message, String errorCode){
        return new ApiResponse<>(false, message, null, errorCode);
    }
}
