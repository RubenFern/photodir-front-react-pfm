
export const validatePassword =(password1, password2) =>
{
    if (password1 === password2)
    {
        return true;
    } else
    {
        return false;
    }
}