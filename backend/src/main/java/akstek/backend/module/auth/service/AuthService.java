package akstek.backend.module.auth.service;

import akstek.backend.common.entity.User;
import akstek.backend.common.response.ApiResponse;
import akstek.backend.module.auth.dto.LoginRequest;
import akstek.backend.module.auth.dto.LoginResponse;
import akstek.backend.module.auth.dto.UserInfo;
import akstek.backend.module.user.UserRepository;
import akstek.backend.security.jwt.JwtProvider;
import akstek.backend.security.service.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;


    public ApiResponse<LoginResponse> login(LoginRequest request){
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.username(), request.password())
        );

        CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();

        if (userDetails != null) {
            String token = jwtProvider.generateToken(userDetails);
            Date expiration = jwtProvider.extractExpiration(token);

            User user = userRepository.findById(userDetails.getId())
                    .orElseThrow();
            userRepository.save(user);

            UserInfo userInfo = new UserInfo(
                    userDetails.getId(),
                    userDetails.getUsername(),
                    user.getFullName(),
                    user.getRole()
            );

            return ApiResponse.success(new LoginResponse(token, expiration.toInstant(), userInfo));
        }
        return ApiResponse.error("Login failed!", "UNAUTHORIZE");
    }
}
